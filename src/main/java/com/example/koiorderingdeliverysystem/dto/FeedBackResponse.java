package com.example.koiorderingdeliverysystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FeedBackResponse {
    private int id;
    private String content;
    private int rating;
    private String username;

}
