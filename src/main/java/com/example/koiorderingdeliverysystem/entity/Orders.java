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
public class    Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Users customerId;

    private Date order_date;
    private String original_location;
    private String destination;
    private String transport_method;
    private String status;
    private double fish_weight;
    private int quantity;
    private float total;


    @ManyToOne
    @JoinColumn(name = "approved_by")
    private Users approvedBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private Users assignedTo;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Users getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Users customerId) {
        this.customerId = customerId;
    }

    public Date getOrder_date() {
        return order_date;
    }

    public void setOrder_date(Date order_date) {
        this.order_date = order_date;
    }

    public String getOriginal_location() {
        return original_location;
    }

    public void setOriginal_location(String original_location) {
        this.original_location = original_location;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getTransport_method() {
        return transport_method;
    }

    public void setTransport_method(String transport_method) {
        this.transport_method = transport_method;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getFish_weight() {
        return fish_weight;
    }

    public void setFish_weight(double fish_weight) {
        this.fish_weight = fish_weight;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Users getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(Users approvedBy) {
        this.approvedBy = approvedBy;
    }

    public Users getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Users assignedTo) {
        this.assignedTo = assignedTo;
    }
}
