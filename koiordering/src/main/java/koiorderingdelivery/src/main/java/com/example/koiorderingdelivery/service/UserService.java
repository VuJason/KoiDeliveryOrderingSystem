package com.example.koiorderingdelivery.service;

import com.example.koiorderingdelivery.dto.LoginDto;
import com.example.koiorderingdelivery.dto.RegisterDto;
import com.example.koiorderingdelivery.entity.User;
import com.example.koiorderingdelivery.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterDto registerDto) {
        if(userRepository.findByEmail(registerDto.getEmail()).isPresent()){
            return "Email already exists";
        }

        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerDto.getPassword()));
        userRepository.save(user);

        return "User registered successfully";
    }

    public String login(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(loginDto.getPassword(), user.getPasswordHash())){
            return "Login successfully";
        }

        return "Invalid credentials";
    }
}
