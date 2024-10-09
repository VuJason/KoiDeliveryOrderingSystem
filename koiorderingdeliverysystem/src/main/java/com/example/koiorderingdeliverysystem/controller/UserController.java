package com.example.koiorderingdeliverysystem.controller;



import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody Users user) {
            Users newUser = userService.register(user);
            return ResponseEntity.ok(newUser);

    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDto login) {
        Users checkuser = userService.login(login);
        return ResponseEntity.ok(checkuser);
    }

    @PostMapping("/logout")
    public String logout() {
        userService.logout();
        return "Logged out successfully";
    }


}
