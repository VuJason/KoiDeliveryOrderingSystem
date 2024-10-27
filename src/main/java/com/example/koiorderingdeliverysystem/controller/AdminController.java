package com.example.koiorderingdeliverysystem.controller;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "https://localhost:5177")
@RequestMapping("/api/admin")
@SecurityRequirement(name = "api")
public class AdminController {

    @GetMapping
    public ResponseEntity getAdmin() {
        return null;
    }

}
