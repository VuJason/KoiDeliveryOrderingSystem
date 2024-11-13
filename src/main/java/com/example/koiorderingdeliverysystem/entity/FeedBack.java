package com.example.koiorderingdeliverysystem.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String content;
    private int rating;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    Users customer;


}
