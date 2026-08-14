package com.eventflow.controller;

import com.eventflow.dto.ReservationRequestDTO;
import com.eventflow.dto.ReservationResponseDTO;
import com.eventflow.service.TicketBookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Booking Engine", description = "High-concurrency ticket reservation endpoints")
public class BookingController {

    private final TicketBookingService ticketBookingService;

    @PostMapping("/reserve")
    @Operation(summary = "Reserve tickets in high-concurrency mode with Redis atomic check & Redisson lock")
    public ResponseEntity<ReservationResponseDTO> reserveTickets(@Valid @RequestBody ReservationRequestDTO request) {
        ReservationResponseDTO response = ticketBookingService.reserveTickets(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
