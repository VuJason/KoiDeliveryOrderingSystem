package com.example.koiorderingdeliverysystem.dto;


import com.example.koiorderingdeliverysystem.entity.Users;
import lombok.Data;

@Data
public class EmailDetail {
    private Users receiver;
    private String subject;
    private String link;
}
