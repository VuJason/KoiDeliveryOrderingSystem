package com.example.koiorderingdeliverysystem.controller;


import com.example.koiorderingdeliverysystem.entity.FeedBack;
import com.example.koiorderingdeliverysystem.service.FeedBackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:8080")
@RequestMapping("/api/feedback")
@SecurityRequirement(name = "api")
public class FeedBackController {

    @Autowired
    FeedBackService feedBackService;

    @GetMapping
    public List<FeedBack> getAllFeedback() {
        return feedBackService.getAll();
    }
}
