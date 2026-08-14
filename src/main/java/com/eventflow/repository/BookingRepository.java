package com.eventflow.repository;

import com.eventflow.model.Booking;
import com.eventflow.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingReference(String bookingReference);
    List<Booking> findByUserId(Long userId);
    List<Booking> findByStatusAndExpiresAtBefore(BookingStatus status, ZonedDateTime now);
    long countByEventId(Long eventId);
}
