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
    @GetMapping("/generate-qrcode")
    public ResponseEntity<byte[]> getQRCode(@RequestParam String vnpUrl) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BitMatrix matrix = new QRCodeWriter().encode(vnpUrl, BarcodeFormat.QR_CODE, 300, 300);
            MatrixToImageWriter.writeToStream(matrix, "PNG", baos);

            byte[] qrCodeImage = baos.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentLength(qrCodeImage.length);

            return ResponseEntity.ok().headers(headers).body(qrCodeImage);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}


