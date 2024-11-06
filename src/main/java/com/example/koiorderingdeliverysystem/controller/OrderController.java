package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.dto.*;
import com.example.koiorderingdeliverysystem.dto.request.OrderRequestDto;
import com.example.koiorderingdeliverysystem.dto.response.OrderResponse;
import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
@SecurityRequirement(name = "api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/order")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<OrderResponse> placeOrder(@Valid @RequestBody OrderRequestDto orderRequest) {

        OrderResponse order = orderService.placeOrder(orderRequest);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/order/customer")
    public List<OrderHistory> getCustomerOrder() {
        return orderService.getCustomerOrder();

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



    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity deleteOrder(@PathVariable int orderId) {
        Orders deletedOrders = orderService.deleteOrder(orderId);
        return ResponseEntity.ok(deletedOrders);

    }

    @DeleteMapping("/order/cancel-expired")
    public ResponseEntity<String> cancelExpiredOrders() {
        orderService.cancelExpiredOrders();
        return ResponseEntity.ok("Expired orders have been cancelled.");
    }

    @PutMapping("/order/staff/{orderId}/approve")
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<OrderDto> approveOrder(
            @PathVariable Integer orderId,
            @RequestParam Integer staffId) {
        Orders approvedOrder = orderService.approveOrder(orderId, staffId);
        return ResponseEntity.ok(modelMapper.map(approvedOrder, OrderDto.class));
    }
}
