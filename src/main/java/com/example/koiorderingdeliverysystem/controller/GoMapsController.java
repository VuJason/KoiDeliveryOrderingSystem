package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.service.GoMapsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/distances")
@CrossOrigin(origins = "https://localhost:5173")
@SecurityRequirement(name = "api")
public class GoMapsController {

    private final GoMapsService goMapsService;

    public GoMapsController(GoMapsService goMapsService) {
        this.goMapsService = goMapsService;
    }

    @GetMapping("/distances")
    public String getDistance(@RequestParam String origin, @RequestParam String destination) {
        return goMapsService.getDistance(origin, destination);
    }
}

