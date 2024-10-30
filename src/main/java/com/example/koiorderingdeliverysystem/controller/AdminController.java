package com.example.koiorderingdeliverysystem.controller;


import com.example.koiorderingdeliverysystem.service.AdminService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@CrossOrigin(origins = "https://localhost:5173")
@RequestMapping("/api/admin")
@SecurityRequirement(name = "api")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/stats")
    public ResponseEntity getDashboardStats() {
        Map<String, Object> stats = adminService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

}
