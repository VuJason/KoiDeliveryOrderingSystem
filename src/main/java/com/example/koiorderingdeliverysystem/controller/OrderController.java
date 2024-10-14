package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.dto.OrderRequestDto;
import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.service.OrderService;
import jakarta.validation.Valid;
import org.hibernate.query.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;


    @PostMapping("/order")
    public ResponseEntity placeOrder(@Valid @RequestBody OrderRequestDto orderRequest) {
        Orders placedOrder = orderService.placeOrder(orderRequest);
        return ResponseEntity.ok(placedOrder);
    }

    @GetMapping("/staff/view")
    public ResponseEntity<List<Orders>> getAllOrdersForStaff() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/staff/update/{orderId}")
    public ResponseEntity<Orders> updateOrderStatus(@PathVariable Integer orderId, @RequestBody OrderRequestDto orderRequestDto) {
        Orders updatedOrder = orderService.updateOrder(orderId, orderRequestDto);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/staff/delete/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Integer orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.ok("Order deleted successfully");
    }

    @GetMapping("/order")
    public ResponseEntity getAllOrders() {
        List<Orders> ordersList = orderService.getAllOrders();
        return ResponseEntity.ok(ordersList);
    }
}
