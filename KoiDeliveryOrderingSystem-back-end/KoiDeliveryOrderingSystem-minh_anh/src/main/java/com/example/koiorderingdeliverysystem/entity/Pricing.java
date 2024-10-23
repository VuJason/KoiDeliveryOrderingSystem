package com.example.koiorderingdeliverysystem.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;



@Entity
@Data
public class Pricing {
    @Id
    private String priceId;
    private String serviceId;
    private String transport;
    private double fishWeightMin;
    private double fishWeightMax;
    private double distance;
}
