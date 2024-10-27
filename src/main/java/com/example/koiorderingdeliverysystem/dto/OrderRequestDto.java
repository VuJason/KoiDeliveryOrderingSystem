package com.example.koiorderingdeliverysystem.dto;

import com.example.koiorderingdeliverysystem.entity.OrderStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class OrderRequestDto {
    @Schema(description = "order's quantity", example = "5")
    private int quantity;

    @Schema(description = "Original location of the fish", example = "Tokyo, Japan")
    private String original_location;

    @Schema(description = "Destination of the fish", example = "San Francisco, USA")
    private String destination;

    @Schema(description = "Transport method for the fish", example = "Air")
    private String transport_method;

    private String additional_services;
    private Date order_date;
}
