package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.dto.OrderDto;
import com.example.koiorderingdeliverysystem.dto.OrderRequestDto;
import com.example.koiorderingdeliverysystem.dto.OrderResponse;
import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
@SecurityRequirement(name = "api")
public class OrderController {
    @Autowired
    private OrderService orderService;


    @PostMapping("/order")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity placeOrder(@Valid @RequestBody OrderRequestDto orderRequest) {

        OrderResponse order = orderService.placeOrder(orderRequest);
        return ResponseEntity.ok(order);
    }
//    public ResponseEntity placeOrder(@Valid @RequestBody OrderRequestDto orderRequest, LoginDto users) {
//        String email = users.getEmail();
//        OrderResponse placedOrder = orderService.placeOrder(orderRequest, email);
//        return ResponseEntity.ok(placedOrder);
//    }

    @GetMapping("/order")
    public ResponseEntity getAllOrders() {
        List<Orders> ordersList = orderService.getAllOrders();
        return ResponseEntity.ok(ordersList);
    }


    @GetMapping("/order/staff/viewOrder")
    public List<OrderDto> getOrder() {
        return orderService.getOrders();
    }

    @PutMapping("/order/staff/{orderId}/status")
    public ResponseEntity<OrderDto> updateOrderStatus(
            @PathVariable Integer orderId,
            @RequestParam String status){ // Thêm tham số để chỉ định nhân viên giao hàng

        // Tạo OrderDTO từ các tham số
        OrderDto orderDTO = new OrderDto(status, orderId);

        // Gọi service để cập nhật đơn hàng
        OrderDto updatedOrder = orderService.updateOrderStatus(orderDTO);
        return ResponseEntity.ok(updatedOrder);
    }

    @PutMapping("/order/staff/{orderId}/assign")
    public ResponseEntity<OrderDto> assignDeliveryStaff(
            @PathVariable Integer orderId,
            @RequestParam Integer deliveryStaffId) {

        OrderDto updatedOrder = orderService.assignDeliveryStaff(orderId, deliveryStaffId);
        return ResponseEntity.ok(updatedOrder);
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
