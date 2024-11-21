package com.example.koiorderingdeliverysystem.dto;


import com.example.koiorderingdeliverysystem.entity.Users;
import lombok.Data;

import java.util.Date;

@Data
public class EmailDetail {
    private Users receiver;
    private String subject;
    private String link;
    private String reason;
    private Date createOrder;
}
