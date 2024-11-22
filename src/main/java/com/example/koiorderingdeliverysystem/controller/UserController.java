package com.example.koiorderingdeliverysystem.controller;



import com.example.koiorderingdeliverysystem.dto.*;
import com.example.koiorderingdeliverysystem.dto.request.ForgotPasswordRequest;
import com.example.koiorderingdeliverysystem.dto.request.LoginDto;
import com.example.koiorderingdeliverysystem.dto.request.RegistrationDto;
import com.example.koiorderingdeliverysystem.dto.response.DeliveryStaffResponse;
import com.example.koiorderingdeliverysystem.dto.response.RegistrationResponse;
import com.example.koiorderingdeliverysystem.dto.response.UpdateResponse;
import com.example.koiorderingdeliverysystem.dto.response.UserResponse;
import com.example.koiorderingdeliverysystem.entity.DeliveryStaffStatus;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import com.example.koiorderingdeliverysystem.service.OrderService;
import com.example.koiorderingdeliverysystem.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
@SecurityRequirement(name = "api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@Valid @RequestBody RegistrationDto register) {
        RegistrationResponse newUser = userService.register(register);
        return ResponseEntity.ok(newUser);

    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginDto login) {
        UserResponse checkuser = userService.login(login);
        return ResponseEntity.ok(checkuser);
    }

    @PostMapping("/logout")
    public String logout() {
        userService.logout();
        return "Logged out successfully";
    }

    @GetMapping("/user")
    public List<UserResponse> getAllUsers() {
        return userService.getAllUser();
    }

    @GetMapping("/user/delivery_staff")
    @PreAuthorize("hasAuthority('STAFF')")
    public List<DeliveryStaffResponse> getDeliveryStaff() {
        return userService.getDeliveryStaffUsers();
    }

    @PutMapping("/customer/{customerId}")
    public ResponseEntity<UpdateResponse> updateCustomer(@Valid @RequestBody UpdateProfile updateProfile) {
        UpdateResponse update = userService.updateCustomerProfile(updateProfile);
        return ResponseEntity.ok(update);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") int userId) {
        Users deletedUsers = userService.delete(userId);
        return ResponseEntity.ok(deletedUsers);
    }

    @GetMapping("/currentUser/detail")
    public ResponseEntity<UpdateResponse> getCurrentUser() {
        UpdateResponse userResponse = userService.getCurrentUserInfo();
        return ResponseEntity.ok(userResponse);
    }

    @PutMapping("/order/{orderId}/complete")
    public ResponseEntity<String> completeDelivery(@PathVariable int orderId) {
        orderService.completeDelivery(orderId);
        return ResponseEntity.ok("Delivery completed and order count reset.");
    }

    @PutMapping("/deliveryStaff/{deliveryStaffId}/status")
    public ResponseEntity<DeliveryStaffResponse> updateDeliveryStaffStatus(@PathVariable int deliveryStaffId, @RequestParam String status) {
        DeliveryStaffResponse updateDeliveryStaffStatus = userService.updateDeliveryStaffStatus(deliveryStaffId, status);
        return ResponseEntity.ok(updateDeliveryStaffStatus);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity forgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        userService.forgotPassword(forgotPasswordRequest);
        return ResponseEntity.ok("Password forgot succesfully");
    }

}
