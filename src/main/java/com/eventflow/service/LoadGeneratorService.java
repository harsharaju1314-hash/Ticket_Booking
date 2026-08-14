package com.eventflow.service;

import com.eventflow.dto.ReservationRequestDTO;
import com.eventflow.dto.SurgeTestRequestDTO;
import com.eventflow.dto.SurgeTestResultDTO;
import com.eventflow.exception.ConcurrentBookingException;
import com.eventflow.exception.OversoldException;
import com.eventflow.repository.TicketCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoadGeneratorService {

    private final TicketBookingService ticketBookingService;
    private final TicketCategoryRepository ticketCategoryRepository;

    public SurgeTestResultDTO runSurgeSimulation(SurgeTestRequestDTO request) {
        int users = request.getConcurrentUsers() != null ? request.getConcurrentUsers() : 100;
        int qty = request.getTicketsPerUser() != null ? request.getTicketsPerUser() : 1;
        Long eventId = request.getEventId() != null ? request.getEventId() : 1L;
        Long catId = request.getTicketCategoryId() != null ? request.getTicketCategoryId() : 1L;

        ExecutorService executor = Executors.newFixedThreadPool(Math.min(users, 50));
        CountDownLatch latch = new CountDownLatch(users);

        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger oversoldFailures = new AtomicInteger(0);
        AtomicInteger lockTimeouts = new AtomicInteger(0);

        long start = System.currentTimeMillis();

        for (int i = 1; i <= users; i++) {
            final long userId = (i % 4) + 1; // Map to seeded users 1..4
            executor.submit(() -> {
                try {
                    ReservationRequestDTO req = ReservationRequestDTO.builder()
                            .userId(userId)
                            .eventId(eventId)
                            .ticketCategoryId(catId)
                            .quantity(qty)
                            .build();
                    ticketBookingService.reserveTickets(req);
                    successCount.incrementAndGet();
                } catch (OversoldException e) {
                    oversoldFailures.incrementAndGet();
                } catch (ConcurrentBookingException e) {
                    lockTimeouts.incrementAndGet();
                } catch (Exception e) {
                    log.error("Surge simulation exception for user {}", userId, e);
                } finally {
                    latch.countDown();
                }
            });
        }

        try {
            latch.await(30, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            executor.shutdownNow();
        }

        long durationMs = Math.max(1, System.currentTimeMillis() - start);
        double rps = (users * 1000.0) / durationMs;

        Integer remainingStock = ticketCategoryRepository.findById(catId)
                .map(c -> c.getAvailableStock())
                .orElse(0);

        return SurgeTestResultDTO.builder()
                .totalRequests(users)
                .successfulBookings(successCount.get())
                .failedOversold(oversoldFailures.get())
                .lockTimeouts(lockTimeouts.get())
                .durationMs(durationMs)
                .requestsPerSecond(Math.round(rps * 100.0) / 100.0)
                .remainingStock(remainingStock)
                .oversellingPrevented(remainingStock >= 0)
                .build();
    }
}
