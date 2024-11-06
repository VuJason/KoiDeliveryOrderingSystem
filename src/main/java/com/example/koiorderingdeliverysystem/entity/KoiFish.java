package com.example.koiorderingdeliverysystem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class KoiFish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String koi_name;
    private double fish_weight;
    @ElementCollection
    private List<String> imagePaths;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Users customer_koi;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders order;
}
