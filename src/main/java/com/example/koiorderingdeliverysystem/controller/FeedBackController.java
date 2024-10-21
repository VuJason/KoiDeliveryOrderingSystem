package com.example.koiorderingdeliverysystem.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/feedback")
public class FeedBackController {

    @GetMapping
    public ResponseEntity getAll() {
        return null;
    }
}
