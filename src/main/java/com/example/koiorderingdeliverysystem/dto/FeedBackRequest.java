package com.example.koiorderingdeliverysystem.dto;


import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class FeedBackRequest {
    private String content;
    private int rating;

}
