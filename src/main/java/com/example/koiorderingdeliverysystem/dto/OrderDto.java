package com.example.koiorderingdeliverysystem.dto;

import com.example.koiorderingdeliverysystem.entity.Users;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderDto {
    private int orderId;
    private String customerName;
    private String orderStatus;
    private Date order_date;
    private String original_location;
    private String destination;
    private String transport_method;
    private Integer assignedTo;

    public OrderDto() {
    }

    public OrderDto(String orderStatus, int orderId) {
        this.orderStatus = orderStatus;
        this.orderId = orderId;
    }

    public OrderDto(String transport_method, String destination, String original_location,
                    Date order_date, String orderStatus, String customerName, int orderId) {
        this.transport_method = transport_method;
        this.destination = destination;
        this.original_location = original_location;
        this.order_date = order_date;
        this.orderStatus = orderStatus;
        this.customerName = customerName;
        this.orderId = orderId;
    }
    public OrderDto(String transport_method, String destination, String original_location,
                    Date order_date, String orderStatus, String customerName, int orderId, Integer assignedTo) {
        this.transport_method = transport_method;
        this.destination = destination;
        this.original_location = original_location;
        this.order_date = order_date;
        this.orderStatus = orderStatus;
        this.customerName = customerName;
        this.orderId = orderId;
        this.assignedTo=assignedTo;
    }



    public OrderDto(String transportMethod, String destination, String originalLocation, Date orderDate, String status, String fullname, int id, String fullname1, String username, String fullname2) {
    }


    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
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

    public Integer getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Integer assignedTo) {
        this.assignedTo = assignedTo;
    }
}