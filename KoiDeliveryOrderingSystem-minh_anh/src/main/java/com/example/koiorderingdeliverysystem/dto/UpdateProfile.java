package com.example.koiorderingdeliverysystem.dto;


import lombok.Data;

@Data
public class UpdateProfile {
    private String fullName;
    private String email;
    private String phone;
    private String address;
}
