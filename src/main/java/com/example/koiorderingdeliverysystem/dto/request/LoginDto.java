package com.example.koiorderingdeliverysystem.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
public class LoginDto {
    @Schema(description = "User's email address", example = "user@example.com")
    @Email(message = "Email not valid!")
    private String email;
    @Schema(description = "User's password", example = "password123")
    @NotBlank(message = "Password can not blank!")
    private String password;

    // Getters and Setters

}
