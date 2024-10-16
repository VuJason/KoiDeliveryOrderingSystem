package com.example.koiorderingdeliverysystem.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
public class LoginDto {

    @Email(message = "Email not valid!")
    private String email;
    @NotBlank(message = "Password can not blank!")
    private String password;

    // Getters and Setters

}
