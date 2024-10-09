package com.example.koiorderingdeliverysystem.dto;

import com.example.koiorderingdeliverysystem.entity.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class OrderRequestDto {

    private String orderId;
    private int quantity;
    private double fishWeight;
    private String originalLocation;
    private String destination;
    private String transport;
    private Date orderDate;
    private OrderStatus status;
}
