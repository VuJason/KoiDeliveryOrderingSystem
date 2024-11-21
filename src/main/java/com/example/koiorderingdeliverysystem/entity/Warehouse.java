package com.example.koiorderingdeliverysystem.entity;

import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String address;

    @ElementCollection
    @CollectionTable(name = "warehouse_order_ids", joinColumns = @JoinColumn(name = "warehouse_id"))
    @Column(name = "order_id")
    private List<Integer> orderIds = new ArrayList<>();

}
