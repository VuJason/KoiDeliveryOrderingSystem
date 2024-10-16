package com.example.koiorderingdeliverysystem.dto;


import lombok.Data;

@Data
public class OrderResponse {
    private int id;
    private int quantity;
    private double fish_weight;
    private String original_location;
    private String destination;
    private String transport_method;
}
