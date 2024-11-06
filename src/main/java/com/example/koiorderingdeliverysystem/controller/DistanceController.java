package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.service.DistanceService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/distance")
@CrossOrigin(origins = "http://localhost:5173")
@SecurityRequirement(name = "api")
public class DistanceController {

    private final DistanceService distanceService;

    public DistanceController(DistanceService distanceService) {
        this.distanceService = distanceService;
    }

    @GetMapping
    public double getDistance(@RequestParam String start, @RequestParam String end) {
        return distanceService.calculateDistance(start, end);
    }
}
