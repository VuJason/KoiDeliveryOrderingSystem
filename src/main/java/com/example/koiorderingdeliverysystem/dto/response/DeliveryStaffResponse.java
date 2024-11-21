package com.example.koiorderingdeliverysystem.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class DeliveryStaffResponse {
    private int id;
    private String fullName;
    private String email;
    private String phone;
    private int orderCount;
    private String deliveryStaffStatus;
}
