package com.example.koiorderingdeliverysystem.dto;


import com.example.koiorderingdeliverysystem.entity.Roles;
import lombok.Data;

@Data
public class RegistrationDto {
    private String username;
    private String password;
    private String email;
    private String role;

}
