package com.example.koiorderingdeliverysystem.dto;


import com.example.koiorderingdeliverysystem.entity.Roles;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class RegistrationDto {

    @Schema(description = "User's username", example = "username123")
    private String username;
    @Schema(description = "User's password", example = "password123")
    private String password;
    @Schema(description = "User's email", example = "user@example.com")
    private String email;
    @Schema(description = "User's role", example = "admin, staff, delivery staff, customer")
    private String role;

}
