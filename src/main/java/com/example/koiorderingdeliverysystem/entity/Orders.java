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

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public double getFishWeight() {
        return fishWeight;
    }

    public void setFishWeight(double fishWeight) {
        this.fishWeight = fishWeight;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getOriginLocation() {
        return originLocation;
    }

    public void setOriginLocation(String originLocation) {
        this.originLocation = originLocation;
    }

    public String getDestinationLocation() {
        return destinationLocation;
    }

    public void setDestinationLocation(String destinationLocation) {
        this.destinationLocation = destinationLocation;
    }

    public String getTransportMethod() {
        return transportMethod;
    }

    public void setTransportMethod(String transportMethod) {
        this.transportMethod = transportMethod;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
