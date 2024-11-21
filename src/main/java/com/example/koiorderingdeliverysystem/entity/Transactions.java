package com.example.koiorderingdeliverysystem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Transactions {
    @Id
    private String id;
    private double amount;
    private String paymentMethod;
    Date transactionDate;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Users customerTrans;
    @ManyToOne
    Orders orders;
}