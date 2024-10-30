package com.example.koiorderingdeliverysystem.controller;


import com.example.koiorderingdeliverysystem.dto.request.FeedBackRequest;
import com.example.koiorderingdeliverysystem.dto.response.FeedBackResponse;
import com.example.koiorderingdeliverysystem.dto.response.CreatedFeedbackResponse;
import com.example.koiorderingdeliverysystem.service.FeedBackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/feedback")
@SecurityRequirement(name = "api")
public class FeedBackController {

    @Autowired
    FeedBackService feedBackService;

    @PreAuthorize("hasAuthority('CUSTOMER')")
    @PostMapping
    public CreatedFeedbackResponse create(@RequestBody FeedBackRequest feedBackRequest) {
        return feedBackService.createFeedBack(feedBackRequest);

    }

    @GetMapping
    public List<FeedBackResponse> getAllFeedback() {
        return feedBackService.getFeedback();
    }
}
