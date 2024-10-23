package com.example.koiorderingdeliverysystem.controller;



import com.example.koiorderingdeliverysystem.dto.*;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import com.example.koiorderingdeliverysystem.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
@SecurityRequirement(name = "api")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationDto register) {
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
    public ResponseEntity getAllUsers() {
        List<Users> usersList = userRepository.findAll();
        return ResponseEntity.ok(usersList);
    }

    @PutMapping("/customer/{customerId}")
    public ResponseEntity updateCustomer(@PathVariable("customerId") int customerId, UpdateProfile updateProfile) {
        UserResponse update = userService.updateCustomerProfile(customerId, updateProfile);
        return ResponseEntity.ok(update);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") int userId) {
        Users deletedUsers = userService.delete(userId);
        return ResponseEntity.ok(deletedUsers);
    }




}
