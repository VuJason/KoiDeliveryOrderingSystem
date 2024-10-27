package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.service.OrderService;
import com.example.koiorderingdeliverysystem.service.VnpayService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "https://localhost:5173")
@SecurityRequirement(name = "api")
public class PaymentController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private VnpayService vnPayService;

    @GetMapping("/generate-qrcode/{orderId}")
    public String generateQR(@PathVariable int orderId, HttpServletRequest request) {
        return orderService.getOrderById(orderId)
                .map(order -> vnPayService.generatePaymentQR(order.getId(), order.getTotal(), request))
                .orElse("Order not found");
    }

}


