package com.eventflow.service;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class AnalyticsService {

    private final Counter successfulBookingsCounter;
    private final Counter failedOversoldCounter;
    private final Counter lockTimeoutCounter;
    private final Timer bookingProcessingTimer;

    public AnalyticsService(MeterRegistry registry) {
        this.successfulBookingsCounter = Counter.builder("eventflow_bookings_total")
                .description("Total successful ticket reservations")
                .tag("status", "success")
                .register(registry);

        this.failedOversoldCounter = Counter.builder("eventflow_bookings_failed_total")
                .description("Total failed booking attempts due to stock sellout")
                .tag("reason", "oversold")
                .register(registry);

        this.lockTimeoutCounter = Counter.builder("eventflow_bookings_failed_total")
                .description("Total failed booking attempts due to lock timeout")
                .tag("reason", "lock_timeout")
                .register(registry);

        this.bookingProcessingTimer = Timer.builder("eventflow_booking_latency_seconds")
                .description("Execution latency for ticket reservations")
                .register(registry);
    }

    public void recordSuccess() {
        successfulBookingsCounter.increment();
    }

    public void recordOversold() {
        failedOversoldCounter.increment();
    }

    public void recordLockTimeout() {
        lockTimeoutCounter.increment();
    }

    public void recordLatency(long elapsedMs) {
        bookingProcessingTimer.record(elapsedMs, TimeUnit.MILLISECONDS);
    }
}
