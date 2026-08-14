package com.eventflow.controller;

import com.eventflow.dto.EventDTO;
import com.eventflow.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Event Catalogue", description = "Endpoints for managing and querying live events & ticket availability")
public class EventController {

    private final EventService eventService;

    @GetMapping
    @Operation(summary = "Get all active events with ticket categories")
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllActiveEvents());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get event details and real-time inventory stock")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new event with ticket categories")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        return new ResponseEntity<>(eventService.createEvent(eventDTO), HttpStatus.CREATED);
    }
}
