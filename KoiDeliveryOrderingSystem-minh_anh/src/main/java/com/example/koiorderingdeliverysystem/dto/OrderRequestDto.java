package com.example.koiorderingdeliverysystem.dto;

import com.example.koiorderingdeliverysystem.entity.OrderStatus;
import lombok.*;

import java.util.Date;

@Data
public class OrderRequestDto {

    private int quantity;
    private double fish_weight;
    private String original_location;
    private String destination;
    private String transport_method;
    private Date order_date;
}
