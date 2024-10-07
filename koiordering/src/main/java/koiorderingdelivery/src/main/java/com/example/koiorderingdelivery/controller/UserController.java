package com.example.koiorderingdelivery.controller;

import com.example.koiorderingdelivery.dto.LoginDto;
import com.example.koiorderingdelivery.dto.RegisterDto;
import com.example.koiorderingdelivery.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        return ResponseEntity.ok(userService.register(registerDto));
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(userService.login(loginDto));
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<String> logout() {

        return ResponseEntity.ok("Logged out successfully");
    }
}
