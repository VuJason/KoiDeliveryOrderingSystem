package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.service.DistanceService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
;

@RestController
@RequestMapping("/api/distance")
@CrossOrigin(origins = "https://localhost:5173")
@SecurityRequirement(name = "api")
public class DistanceController {

    private final DistanceService distanceService;

    @Autowired
    public DistanceController(DistanceService distanceService) {
        this.distanceService = distanceService;
    }

    @GetMapping
    public String getDistance(
            @RequestParam String origin,
            @RequestParam String destination
    ) {
        return distanceService.getDistance(origin, destination);
    }
}