package com.eventflow.controller;

import com.eventflow.dto.SurgeTestRequestDTO;
import com.eventflow.dto.SurgeTestResultDTO;
import com.eventflow.service.LoadGeneratorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/surge-test")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Surge Simulator", description = "Load testing and real-time concurrency benchmark endpoints")
public class SurgeTestController {

    private final LoadGeneratorService loadGeneratorService;

    @PostMapping("/run")
    @Operation(summary = "Simulate flash-sale traffic surge with concurrent threads")
    public ResponseEntity<SurgeTestResultDTO> runSurgeTest(@RequestBody SurgeTestRequestDTO request) {
        SurgeTestResultDTO result = loadGeneratorService.runSurgeSimulation(request);
        return ResponseEntity.ok(result);
    }
}
