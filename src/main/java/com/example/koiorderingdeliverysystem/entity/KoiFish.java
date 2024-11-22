package com.example.koiorderingdeliverysystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class KoiFish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String koi_name;
    @Positive(message = "weight must be positive")
    private double fish_weight;
    private String imagePath;
    private String status;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Users customer_koi;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders order;


}
