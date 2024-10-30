package com.example.koiorderingdeliverysystem.dto;


import com.example.koiorderingdeliverysystem.entity.Roles;
import lombok.Data;

@Data
public class RegistrationResponse {
    private int id;
    private String username;
    private String email;
}
