package com.example.koiorderingdeliverysystem.service;



import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.entity.Transactions;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.TransactionsRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class VnpayService {
    private static final String VNPAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private static final String VNP_HASH_SECRET = "VI6CNUGHU58HI2U74JXGYSR8MTWB90LQ"; // Replace with your actual secret code

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    private TransactionsRepository transactionsRepository;

    public String generatePaymentQR(int orderId, double totalAmount, HttpServletRequest request) {
        try {
            String ipAddress= getClientIp(request);
            Map<String, String> vnpParams = new TreeMap<>();
            vnpParams.put("vnp_Version", "2.1.0");
            vnpParams.put("vnp_Command", "pay");
            vnpParams.put("vnp_TmnCode", "PXKV3DFK"); // Replace with your TmnCode
            vnpParams.put("vnp_Locale", "vn");
            vnpParams.put("vnp_CurrCode", "VND");
            vnpParams.put("vnp_TxnRef", String.valueOf(orderId));
            vnpParams.put("vnp_OrderInfo", "Payment for order " + orderId);
            vnpParams.put("vnp_OrderType", "order");
            vnpParams.put("vnp_Amount", String.valueOf((int) (totalAmount * 100))); // Convert to VND in cents
            vnpParams.put("vnp_ReturnUrl", "http://localhost:5173/result"); // Replace with your return URL
            vnpParams.put("vnp_IpAddr", ipAddress);
            vnpParams.put("vnp_CreateDate", getCurrentDate("yyyyMMddHHmmss"));

            StringBuilder signDataBuilder = new StringBuilder();
            for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
                signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8).toString());
                signDataBuilder.append("=");
                signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8).toString());
                signDataBuilder.append("&");
            }
            signDataBuilder.deleteCharAt(signDataBuilder.length() - 1);

            String signData = signDataBuilder.toString();
            String signed = generateHMAC(VNP_HASH_SECRET, signData);

            vnpParams.put("vnp_SecureHash", signed);
            StringBuilder urlBuilder = new StringBuilder(VNPAY_URL);
            urlBuilder.append("?");
            for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
                urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8).toString());
                urlBuilder.append("=");
                urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8).toString());
                urlBuilder.append("&");
            }

            urlBuilder.deleteCharAt(urlBuilder.length() - 1);
            return urlBuilder.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String getCurrentDate(String format) {
        return java.time.format.DateTimeFormatter.ofPattern(format)
                .format(java.time.LocalDateTime.now());
    }

    public String getClientIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        return "14.186.90.254";
    }


    private String generateHMAC(String secretKey, String data) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac sha512_HMAC = Mac.getInstance("HmacSHA512");
        SecretKeySpec secret_key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        sha512_HMAC.init(secret_key);

        byte[] hash = sha512_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }

    public String handleVnpayCallback(String url) {
        try {
            Map<String, String> vnpParams = UriComponentsBuilder.fromUriString(url)
                    .build()
                    .getQueryParams()
                    .entrySet()
                    .stream()
                    .collect(Collectors.toMap(
                            Map.Entry::getKey,
                            e -> e.getValue().get(0)
                    ));

            String transactionStatus = vnpParams.get("vnp_TransactionStatus");
            String transactionID = vnpParams.get("vnp_TransactionNo");
            String orderID = vnpParams.get("vnp_TxnRef");
            double amount = Double.parseDouble(vnpParams.get("vnp_Amount")) / 100.0;

            int orderId = Integer.parseInt(orderID);

            if ("00".equals(transactionStatus)) {
                createTransaction(transactionID, orderId, amount, "VNPAY");
                updateOrderStatus(orderId);
                return "SUCCESS";
            } else {
                createTransaction(transactionID, orderId, amount, "VNPAY");
                return "FAILED";
            }
        } catch (Exception e) {
            // Log the error
            return "ERROR";
        }
    }
    private void createTransaction(String transactionID, int orderId, double amount, String paymentMethod) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        Users customer = order.getCustomer();
        if (customer == null) {
            throw new RuntimeException("Customer not found for the order");
        }

        Transactions transaction = new Transactions();
        transaction.setId(transactionID);
        transaction.setOrders(order);
        transaction.setCustomer(customer);
        transaction.setAmount(amount);
        transaction.setPaymentMethod(paymentMethod);
        transaction.setTransactionDate(new Date());

        transactionsRepository.save(transaction);
    }

    private void updateOrderStatus(int orderId) {
        Orders order = ordersRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setPaid(true);
            order.setPaymentDeadline(new Date());
            ordersRepository.save(order);
        } else {
            System.out.println("Order not found with ID: " + orderId);
        }
    }
}