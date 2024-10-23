package com.example.koiorderingdeliverysystem.dto;

import lombok.Data;

import java.util.Date;
@Data
public class CustomerOrderDto {
    private int id;
    private int quantity;
    private double fish_weight;
    private String original_location;
    private String destination;
    private String transport_method;
    private Date order_date;
}
