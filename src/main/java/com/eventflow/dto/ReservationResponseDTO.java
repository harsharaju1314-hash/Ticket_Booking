package com.eventflow.dto;

import com.eventflow.model.BookingStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponseDTO {
    private Long bookingId;
    private String bookingReference;
    private Long userId;
    private Long eventId;
    private String eventTitle;
    private String categoryName;
    private Integer quantity;
    private BigDecimal totalAmount;
    private BookingStatus status;
    private ZonedDateTime expiresAt;
    private Long executionTimeMs;
    private boolean processedViaRedisCache;
}
