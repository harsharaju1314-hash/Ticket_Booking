package com.eventflow.service;

import com.eventflow.dto.ReservationRequestDTO;
import com.eventflow.dto.ReservationResponseDTO;
import com.eventflow.exception.ConcurrentBookingException;
import com.eventflow.exception.OversoldException;
import com.eventflow.exception.ResourceNotFoundException;
import com.eventflow.model.*;
import com.eventflow.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketBookingService {

    private final TicketCategoryRepository ticketCategoryRepository;
    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final RedisLockService redisLockService;
    private final AnalyticsService analyticsService;

    @Value("${eventflow.booking.reservation-hold-duration-seconds:600}")
    private long reservationHoldSeconds;

    @Transactional
    public ReservationResponseDTO reserveTickets(ReservationRequestDTO request) {
        long startTime = System.currentTimeMillis();
        String stockKey = "stock:category:" + request.getTicketCategoryId();
        String lockKey = "lock:category:" + request.getTicketCategoryId();

        // Step 1: Redis Fast-Path Check via Atomic Lua script
        Long remainingStockInRedis = redisLockService.tryAtomicStockDecrement(stockKey, request.getQuantity());

        if (remainingStockInRedis == -2) {
            syncStockToRedisFromDB(request.getTicketCategoryId(), stockKey);
            remainingStockInRedis = redisLockService.tryAtomicStockDecrement(stockKey, request.getQuantity());
        }

        if (remainingStockInRedis == -1) {
            analyticsService.recordOversold();
            log.warn("Redis stock check failed - Category {} sold out for request by User {}", 
                    request.getTicketCategoryId(), request.getUserId());
            throw new OversoldException("Tickets for this category are completely sold out or insufficient stock remaining.");
        }

        // Step 2: Acquire Distributed Redisson Lock for DB transaction consistency
        boolean lockAcquired = redisLockService.executeWithLock(lockKey, 1500, 3000, () -> {
            processDatabaseReservation(request, startTime);
        });

        if (!lockAcquired) {
            redisLockService.setStockInRedis(stockKey, redisLockService.getStockFromRedis(stockKey) + request.getQuantity());
            analyticsService.recordLockTimeout();
            throw new ConcurrentBookingException("High concurrency contention. Please retry your reservation.");
        }

        TicketCategory category = ticketCategoryRepository.findById(request.getTicketCategoryId()).orElseThrow();
        Event event = eventRepository.findById(request.getEventId()).orElseThrow();
        
        long executionTime = System.currentTimeMillis() - startTime;
        analyticsService.recordSuccess();
        analyticsService.recordLatency(executionTime);

        String ref = "EVT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        BigDecimal total = category.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));

        return ReservationResponseDTO.builder()
                .bookingReference(ref)
                .userId(request.getUserId())
                .eventId(request.getEventId())
                .eventTitle(event.getTitle())
                .categoryName(category.getName())
                .quantity(request.getQuantity())
                .totalAmount(total)
                .status(BookingStatus.RESERVED)
                .expiresAt(ZonedDateTime.now().plusSeconds(reservationHoldSeconds))
                .executionTimeMs(executionTime)
                .processedViaRedisCache(true)
                .build();
    }

    public void processDatabaseReservation(ReservationRequestDTO request, long startTime) {
        int updatedRows = ticketCategoryRepository.decrementStockAtomic(
                request.getTicketCategoryId(), request.getQuantity());

        if (updatedRows == 0) {
            throw new OversoldException("Database concurrency check failed: Stock depleted.");
        }

        TicketCategory category = ticketCategoryRepository.findById(request.getTicketCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        String ref = "EVT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        BigDecimal totalAmount = category.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));

        Booking booking = Booking.builder()
                .bookingReference(ref)
                .userId(request.getUserId())
                .eventId(request.getEventId())
                .ticketCategoryId(request.getTicketCategoryId())
                .quantity(request.getQuantity())
                .totalAmount(totalAmount)
                .status(BookingStatus.RESERVED)
                .expiresAt(ZonedDateTime.now().plusSeconds(reservationHoldSeconds))
                .build();

        bookingRepository.save(booking);
    }

    private void syncStockToRedisFromDB(Long categoryId, String stockKey) {
        TicketCategory cat = ticketCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket category not found: " + categoryId));
        redisLockService.setStockInRedis(stockKey, cat.getAvailableStock());
    }
}
