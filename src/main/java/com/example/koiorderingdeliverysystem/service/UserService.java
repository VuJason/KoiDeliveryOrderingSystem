package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.*;
//import com.example.koiorderingdeliverysystem.entity.Customers;
import com.example.koiorderingdeliverysystem.entity.Roles;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

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

    public RegistrationResponse register(RegistrationDto register) {
        Users user = modelMapper.map(register, Users.class);
        try {
            String originalPassword = user.getPassword();
            user.setPassword(passwordEncoder.encode(originalPassword));
            user.setRegistration_date(new Date(System.currentTimeMillis()));

            if (register.getRole() != null) {
                try {
                    Roles role = Roles.valueOf(register.getRole().toString().toUpperCase().replace(" ", "_"));
                    user.setRoles(role);
                } catch (IllegalArgumentException e) {
                    throw new RuntimeException("Invalid role: " + register.getRole());
                }
            } else {
                // Set default role if not provided
                user.setRoles(Roles.CUSTOMER);
            }


            Users newUser = userRepository.save(user);
            return modelMapper.map(newUser, RegistrationResponse.class);
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

    public List<Users> getAllUser() {
        return userRepository.findUsersByStatusTrue();
    }

    public UserResponse updateCustomerProfile(UpdateProfile updateProfile) {
        Users currentUser = getCurrentAccount();
        if(currentUser == null) {
            throw new EntityNotFoundException("Customer not found!");
        }
        currentUser.setFullname(updateProfile.getFullName());
        currentUser.setEmail(updateProfile.getEmail());
        currentUser.setPhone(updateProfile.getPhone());
        currentUser.setAddress(updateProfile.getAddress());
        Users updatedUser = userRepository.save(currentUser);
        return modelMapper.map(updatedUser, UserResponse.class);


    }

    public Users delete(int id) {
        Users user = getStudentById(id);

        user.setStatus(false);
        return userRepository.save(user);
    }

    public Users getStudentById(int id) {
        Users user = userRepository.findUsersById(id);

        if(user == null) throw new EntityNotFoundException("User not found!");
        return user;
    }

    public Users getCurrentAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No authenticated user found");
        }
        String email = authentication.getName();
        Users user = userRepository.findUsersByEmail(email);

        if (user == null) {
            throw new EntityNotFoundException("User not found with email: " + email);
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUsersByEmail(email);
    }


}

