package com.example.koiorderingdeliverysystem.controller;



import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.dto.RegistrationDto;
import com.example.koiorderingdeliverysystem.dto.UserResponse;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
@SecurityRequirement(name = "api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegistrationDto register) {
        UserResponse newUser = userService.register(register);
        return ResponseEntity.ok(newUser);

    }

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginDto login) {
        UserResponse checkuser = userService.login(login);
        return ResponseEntity.ok(checkuser);
    }

    @PostMapping("/logout")
    public String logout() {
        userService.logout();
        return "Logged out successfully";
    }


}
