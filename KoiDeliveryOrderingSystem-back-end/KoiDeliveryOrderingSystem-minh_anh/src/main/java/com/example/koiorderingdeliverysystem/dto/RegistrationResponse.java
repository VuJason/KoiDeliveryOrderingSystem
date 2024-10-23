package com.example.koiorderingdeliverysystem.dto;


import lombok.Data;

@Data
public class RegistrationResponse {
    private int id;
    private String username;
    private String email;
    private String role;
}
