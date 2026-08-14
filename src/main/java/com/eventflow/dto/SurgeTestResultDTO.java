package com.eventflow.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SurgeTestResultDTO {
    private int totalRequests;
    private int successfulBookings;
    private int failedOversold;
    private int lockTimeouts;
    private long durationMs;
    private double requestsPerSecond;
    private int remainingStock;
    private boolean oversellingPrevented;
}
