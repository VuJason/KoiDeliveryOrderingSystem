package com.example.koiorderingdeliverysystem.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.util.Date;

@Data
public class OrderRequestDto {
    @Schema(description = "order's quantity", example = "5")
    @Min(value = 1, message = "at least 1 fish")
    @Max(value = 10, message = "1 order maximum 10 fish")
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
