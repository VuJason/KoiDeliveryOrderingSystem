package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.LoginDto;
//import com.example.koiorderingdeliverysystem.entity.Customers;
import com.example.koiorderingdeliverysystem.dto.RegistrationDto;
import com.example.koiorderingdeliverysystem.dto.UserResponse;
import com.example.koiorderingdeliverysystem.entity.Users;
//import com.example.koiorderingdeliverysystem.repository.CustomerRepository;
import com.example.koiorderingdeliverysystem.exception.EntityNotFoundException;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenService tokenService;

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

    public UserResponse login(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginDto.getEmail(),
                    loginDto.getPassword()
            ));


            Users user = (Users) authentication.getPrincipal();
            UserResponse userResponse = modelMapper.map(user, UserResponse.class);
            userResponse.setToken(tokenService.generateToken(user));
            return userResponse;

        } catch (Exception e) {
            throw new EntityNotFoundException("Invalid email or password!!");
        }

    }

    public void logout() {

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUsersByEmail(email);
    }
}

