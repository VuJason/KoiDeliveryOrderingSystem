package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.LoginDto;
//import com.example.koiorderingdeliverysystem.entity.Customers;
import com.example.koiorderingdeliverysystem.dto.RegistrationDto;
import com.example.koiorderingdeliverysystem.dto.UserResponse;
import com.example.koiorderingdeliverysystem.entity.Users;
//import com.example.koiorderingdeliverysystem.repository.CustomerRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ModelMapper modelMapper;

    public UserResponse register(RegistrationDto register) {
        Users user = modelMapper.map(register, Users.class);
        try {
            String originalPassword = user.getPassword();
            user.setPassword(passwordEncoder.encode(originalPassword));
            Users newUser = userRepository.save(user);
            return modelMapper.map(newUser, UserResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Error creating user: " + e.getMessage());
        }
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}

