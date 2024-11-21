package com.example.koiorderingdeliverysystem.dto;


import lombok.Data;


import java.util.Date;

@Data
public class OrderHistory {
    private int id;
    private String customerName;
    private String destination;
    private Date order_date;
    private double price;
    private String status;
}
