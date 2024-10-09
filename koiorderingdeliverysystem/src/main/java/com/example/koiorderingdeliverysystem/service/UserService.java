package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users register(Users user) {

        Users newUser = userRepository.save(user);
        return newUser;

    }

    public Users login(LoginDto loginDto) {
       Users newLoginDto = userRepository.findByEmail(loginDto.getEmail());
       if (newLoginDto == null) {
           return null;
       }
       return newLoginDto;
    }

    public void logout() {

    }
}

