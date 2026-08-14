package com.eventflow.service;

import com.eventflow.dto.EventDTO;
import com.eventflow.dto.TicketCategoryDTO;
import com.eventflow.exception.ResourceNotFoundException;
import com.eventflow.model.Event;
import com.eventflow.model.TicketCategory;
import com.eventflow.repository.EventRepository;
import com.eventflow.repository.TicketCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {

    private final EventRepository eventRepository;
    private final TicketCategoryRepository ticketCategoryRepository;
    private final RedisLockService redisLockService;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String EVENT_CACHE_KEY_PREFIX = "cache:event:";

    @Transactional(readOnly = true)
    public List<EventDTO> getAllActiveEvents() {
        return eventRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EventDTO getEventById(Long eventId) {
        String cacheKey = EVENT_CACHE_KEY_PREFIX + eventId;
        try {
            EventDTO cached = (EventDTO) redisTemplate.opsForValue().get(cacheKey);
            if (cached != null) {
                log.info("Event cache hit for ID: {}", eventId);
                return cached;
            }
        } catch (Exception e) {
            log.debug("Redis cache fetch skipped: Redis offline");
        }

        Event event = eventRepository.findByIdWithCategories(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + eventId));
        
        EventDTO dto = mapToDTO(event);
        try {
            redisTemplate.opsForValue().set(cacheKey, dto, Duration.ofMinutes(10));
        } catch (Exception e) {
            log.debug("Redis cache set skipped");
        }
        
        for (TicketCategory category : event.getTicketCategories()) {
            String stockKey = "stock:category:" + category.getId();
            if (redisLockService.getStockFromRedis(stockKey) == null) {
                redisLockService.setStockInRedis(stockKey, category.getAvailableStock());
            }
        }

        return dto;
    }

    @Transactional
    public EventDTO createEvent(EventDTO eventDTO) {
        Event event = Event.builder()
                .title(eventDTO.getTitle())
                .description(eventDTO.getDescription())
                .venue(eventDTO.getVenue())
                .imageUrl(eventDTO.getImageUrl())
                .eventDate(eventDTO.getEventDate())
                .status("ACTIVE")
                .build();

        Event savedEvent = eventRepository.save(event);

        if (eventDTO.getTicketCategories() != null) {
            List<TicketCategory> categories = eventDTO.getTicketCategories().stream()
                    .map(c -> TicketCategory.builder()
                            .event(savedEvent)
                            .name(c.getName())
                            .price(c.getPrice())
                            .totalCapacity(c.getTotalCapacity())
                            .availableStock(c.getTotalCapacity())
                            .version(0L)
                            .build())
                    .collect(Collectors.toList());
            ticketCategoryRepository.saveAll(categories);
            savedEvent.setTicketCategories(categories);
            
            for (TicketCategory cat : categories) {
                redisLockService.setStockInRedis("stock:category:" + cat.getId(), cat.getAvailableStock());
            }
        }

        return mapToDTO(savedEvent);
    }

    private EventDTO mapToDTO(Event event) {
        List<TicketCategoryDTO> categories = event.getTicketCategories() != null ?
                event.getTicketCategories().stream().map(c -> TicketCategoryDTO.builder()
                        .id(c.getId())
                        .eventId(event.getId())
                        .name(c.getName())
                        .price(c.getPrice())
                        .totalCapacity(c.getTotalCapacity())
                        .availableStock(c.getAvailableStock())
                        .build()).collect(Collectors.toList()) : List.of();

        return EventDTO.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .venue(event.getVenue())
                .imageUrl(event.getImageUrl())
                .eventDate(event.getEventDate())
                .status(event.getStatus())
                .ticketCategories(categories)
                .build();
    }
}
