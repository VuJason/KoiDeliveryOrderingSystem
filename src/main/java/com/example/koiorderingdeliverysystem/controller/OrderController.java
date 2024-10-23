package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.dto.OrderDto;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasRole('Customer')")
    @PostMapping("/order")
    public ResponseEntity placeOrder(@Valid @RequestBody OrderRequestDto orderRequest, LoginDto users) {
//        String email = users.getEmail();
//        OrderResponse placedOrder = orderService.placeOrder(orderRequest, email);
//        return ResponseEntity.ok(placedOrder);
        return null;
    }

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

    @GetMapping("/delivery/orders")
    public List<OrderDto> getOrdersAssignedToDeliveryStaff(@RequestParam Integer deliveryStaffId) {
        return orderService.getOrdersAssignedToDeliveryStaff(deliveryStaffId);
    }

    @PutMapping("/delivery/order/{orderId}/status")
    public ResponseEntity<OrderDto>  updateOrderStatusByDeliveryStaff(
            @PathVariable Integer orderId,
            @RequestParam String status){

        // Tạo OrderDTO từ các tham số
        OrderDto orderDTO = new OrderDto(status, orderId);

        // Gọi service để cập nhật đơn hàng
        OrderDto updatedOrder = orderService.updateOrderStatus(orderDTO);
        return ResponseEntity.ok(updatedOrder);
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
