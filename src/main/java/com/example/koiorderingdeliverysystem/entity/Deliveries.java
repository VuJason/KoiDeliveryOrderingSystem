package com.example.koiorderingdeliverysystem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;


@Entity
@Data
public class Deliveries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String vehicle;
    private String delivery_status;
    private Date pickup_time;
    private Date delivery_time;

    @OneToMany(mappedBy = "deliveries")
    private List<Users> users;


}
