package com.example.koiorderingdeliverysystem.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderDetailDto {
    private int orderId;
    private String customerName;
    private double totalCost;
    private String status;
    private List<KoiFishDto> koiFishes; // Danh sách cá koi liên quan đến đơn hàng
}