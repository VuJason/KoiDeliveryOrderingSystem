package com.example.koiorderingdeliverysystem.dto;

import com.example.koiorderingdeliverysystem.entity.OrderStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.Date;

@Data
public class OrderRequestDto {
    @Schema(description = "order's quantity", example = "5")
    private int quantity;

    @Schema(description = "Weight of the fish in kilograms", example = "12.5")
    private double fish_weight;

    @Schema(description = "Original location of the fish", example = "Tokyo, Japan")
    private String original_location;

    @Schema(description = "Destination of the fish", example = "San Francisco, USA")
    private String destination;

    @Schema(description = "Transport method for the fish", example = "Air")
    private String transport_method;
    private Date order_date;
}
