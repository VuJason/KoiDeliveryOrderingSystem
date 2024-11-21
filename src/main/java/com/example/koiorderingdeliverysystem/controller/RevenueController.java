package com.example.koiorderingdeliverysystem.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/revenue")
@SecurityRequirement(name = "api")
public class RevenueController {

    @GetMapping
    public ResponseEntity getRevenue() {
        return null;
    }

}
