package com.example.koiorderingdeliverysystem.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.mapping.Join;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Users customer;

    private Date order_date;
    private String original_location;
    private String destination;
    private String transport_method;
    private String status;
    private double fish_weight;
    private int quantity;


    @ManyToOne
    @JoinColumn(name = "approved_by")
    private Users approvedBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private Users assignedTo;
}
