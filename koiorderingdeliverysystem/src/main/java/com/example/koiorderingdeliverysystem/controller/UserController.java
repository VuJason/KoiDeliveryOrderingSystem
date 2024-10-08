package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.dto.RegistrationDto;
import com.example.koiorderingdeliverysystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/register")
    public String register(@RequestBody RegistrationDto registrationDTO) {
        if (userService.register(
                registrationDTO.getUserId(),
                registrationDTO.getUsername(),
                registrationDTO.getEmail(),
                registrationDTO.getPassword(),
                registrationDTO.getRole())) {
            return "Register successful";
        } else {
            return "Username or email already exists";
        }
    }

    @PostMapping("/api/login")
    public String login(@RequestBody LoginDto loginDTO) {
        if (userService.login(loginDTO.getEmail(), loginDTO.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid email, password, or user is inactive";
        }
    }

    @PostMapping("/api/logout")
    public String logout() {
        userService.logout();
        return "Logged out successfully";
    }
}
