package com.example.koiorderingdeliverysystem.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class OrderServices {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Services services;
}
