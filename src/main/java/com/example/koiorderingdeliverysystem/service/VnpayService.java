package com.example.koiorderingdeliverysystem.service;



import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class VnpayService {
    private static final String VNPAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private static final String VNP_HASH_SECRET = "VI6CNUGHU58HI2U74JXGYSR8MTWB90LQ"; // Replace with your actual secret code

    @Autowired
    OrdersRepository ordersRepository;

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

    public void generateQRCodeImage(String text, int width, int height, String filePath) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        Path path = FileSystems.getDefault().getPath(filePath);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
    }

    public String handleVnpayCallback(Map<String, String> vnpParams) {
        String transactionStatus = vnpParams.get("vnp_TransactionStatus");
        if ("00".equals(transactionStatus)) { // "00" nghĩa là thanh toán thành công
            String orderID = vnpParams.get("vnp_TxnRef");
            int orderId = Integer.parseInt(orderID);
            double amount = Double.parseDouble(vnpParams.get("vnp_Amount")) / 100; // Đổi về VND

            // Cập nhật trạng thái đơn hàng
            updateOrderStatus(orderId, "PAID");
            return "Payment successful";
        } else {
            return "Payment failed";
        }
    }

    private void updateOrderStatus(int orderId, String status) {
        // Lấy thông tin đơn hàng từ cơ sở dữ liệu dựa trên orderId
        Orders order = ordersRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(status);
            order.setPaid(true); // Đặt isPaid thành true khi đơn hàng đã thanh toán
            order.setPaymentDeadline(new Date()); // Lưu thời gian thanh toán
            ordersRepository.save(order); // Lưu thay đổi vào cơ sở dữ liệu
        } else {
            System.out.println("Order not found with ID: " + orderId);
        }
    }

}