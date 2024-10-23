package com.example.koiorderingdeliverysystem.config;

import com.example.koiorderingdeliverysystem.service.DistanceService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/distance")
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
