package com.example.koiorderingdeliverysystem.dto.response;


import lombok.Data;

@Data
public class CreatedFeedbackResponse {
    private int id;
    private String content;
    private int rating;
}
