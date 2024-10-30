package com.example.koiorderingdeliverysystem.controller;


import com.example.koiorderingdeliverysystem.dto.OrderHistory;
import com.example.koiorderingdeliverysystem.dto.UpdateProfile;
import com.example.koiorderingdeliverysystem.dto.request.RegistrationDto;
import com.example.koiorderingdeliverysystem.dto.response.RegistrationResponse;
import com.example.koiorderingdeliverysystem.dto.response.UserResponse;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.service.AdminService;
import com.example.koiorderingdeliverysystem.service.OrderService;
import com.example.koiorderingdeliverysystem.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "https://localhost:5173")
@RequestMapping("/api/admin")
@SecurityRequirement(name = "api")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    @Autowired
    AdminService adminService;

    @Autowired
    UserService userService;

    @Autowired
    OrderService orderService;

    @GetMapping("/stats")
    public ResponseEntity getDashboardStats() {
        Map<String, Object> stats = adminService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/create")
    public ResponseEntity<RegistrationResponse> register(@Valid @RequestBody RegistrationDto register) {
        RegistrationResponse newUser = userService.register(register);
        return ResponseEntity.ok(newUser);

    }

    @PutMapping("/user/{userId}")
    public ResponseEntity<UserResponse> updateCustomer(UpdateProfile updateProfile) {
        UserResponse update = userService.updateCustomerProfile(updateProfile);
        return ResponseEntity.ok(update);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") int userId) {
        Users deletedUsers = userService.delete(userId);
        return ResponseEntity.ok(deletedUsers);
    }

    @GetMapping("/user")
    public List<Users> getAllUsers() {
        return userService.getAllUser();
    }

    @GetMapping("/order")
    public List<OrderHistory> getAllOrders() {
        return orderService.getAllOrders();

    }


}
