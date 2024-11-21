package com.example.koiorderingdeliverysystem.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class UpdateResponse {
    private int id;
    private String username;
    private String email;
    private String phone;
    private String address;
}
