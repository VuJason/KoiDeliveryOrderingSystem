package com.example.koiorderingdeliverysystem.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AdminResponse {
    private int id;
    @Schema(description = "User's email address", example = "username")
    private String username;
    @Schema(description = "User's email address", example = "user@example.com")
    private String email;
    @Schema(description = "User's email address", example = "phoneNumber")
    private String phone;
    private String role;
}
