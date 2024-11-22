package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.dto.*;
import com.example.koiorderingdeliverysystem.dto.request.OrderDetailDto;
import com.example.koiorderingdeliverysystem.dto.request.OrderRequestDto;
import com.example.koiorderingdeliverysystem.dto.response.OrderResponse;
import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/order/deliveryStaff/{deliveryStaffId}")
    public List<OrderDto> getDeliveryStaffOrder(@PathVariable int deliveryStaffId) {
        return orderService.getOrdersByDeliveryStaffId(deliveryStaffId);
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
            @PathVariable int orderId,
            @RequestParam int deliveryStaffId) {

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

    @DeleteMapping("/cancel/{orderId}/staff")
    public ResponseEntity cancelOrder(@PathVariable int orderId) {
        Orders deletedOrders = orderService.cancelOrder(orderId);
        return ResponseEntity.ok(deletedOrders);

    }
    @PutMapping("/order/staff/{orderId}/approve")
    @PreAuthorize("hasAuthority('STAFF')")
    public ResponseEntity<OrderDto> approveOrder(
            @PathVariable Integer orderId,
            @RequestParam Integer staffId) {
        Orders approvedOrder = orderService.approveOrder(orderId, staffId);
        return ResponseEntity.ok(modelMapper.map(approvedOrder, OrderDto.class));
    }

    @PutMapping("/payment/{orderId}")
    public ResponseEntity<OrderResponse> updatePaymentStatus(@PathVariable int orderId) {

            OrderResponse response = orderService.updatePaymentStatus(orderId);
            return ResponseEntity.ok(response);

    }

    @GetMapping("/order/{orderId}/detail")
    public ResponseEntity<OrderDetailDto> viewOrderDetail(@PathVariable int orderId) {
        OrderDetailDto orderDetail = orderService.viewOrderDetail(orderId);
        return ResponseEntity.ok(orderDetail);
    }


}
