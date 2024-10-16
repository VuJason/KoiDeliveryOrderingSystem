package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.dto.OrderRequestDto;
import com.example.koiorderingdeliverysystem.dto.OrderResponse;
import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.service.OrderService;
import jakarta.validation.Valid;
import org.hibernate.query.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasRole('Customer')")
    @PostMapping("/order")
    public ResponseEntity placeOrder(@Valid @RequestBody OrderRequestDto orderRequest, LoginDto users) {
        String email = users.getEmail();
        OrderResponse placedOrder = orderService.placeOrder(orderRequest, email);
        return ResponseEntity.ok(placedOrder);
    }


    @GetMapping("/order")
    public ResponseEntity getAllOrders() {
        List<Orders> ordersList = orderService.getAllOrders();
        return ResponseEntity.ok(ordersList);
    }

    @PostMapping("/approve/{orderId}")
    public ResponseEntity approveOrder(@PathVariable long orderId) {
        return null;
    }

    @PostMapping("/assign/{orderId}")
    public ResponseEntity assignOrder(@PathVariable long orderId) {
        return null;
    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity updateOrder(@PathVariable long orderId, @RequestBody OrderRequestDto orderRequest) {
        return null;
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteOrder(@PathVariable long orderId) {
        return null;
    }
}
