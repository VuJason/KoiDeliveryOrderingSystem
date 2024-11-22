package com.example.koiorderingdeliverysystem.controller;


import com.example.koiorderingdeliverysystem.service.OrderService;
import com.example.koiorderingdeliverysystem.service.VnpayService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/payment")
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

    @GetMapping("/callback")
    public String vnpayCallback(@RequestParam(required = false) String url) {
        return vnPayService.handleVnpayCallback(url);
    }

}
