package com.example.koiorderingdeliverysystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @Column(name = "OrderID")
    private String orderId;
    @ManyToOne
    @JoinColumn(name = "CustomerID", nullable = false)
    private Customers customer;



    @Column(name = "OrderDate")
    private Date orderDate;
    @Column(name = "Quantity")
    private int quantity;
    @Column(name="FishWeight")
    private double fishWeight;
    @Column(name = "OriginLocation")
    private String originLocation;
    @Column(name = "DestinationLocation")
    private String destinationLocation;
    @Column(name="TransportMethod")
    private String transportMethod;
    @Column(name = "Price")
    private float price;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    private OrderStatus status; // Sử dụng enum cho trạng thái đơn hàng



}
