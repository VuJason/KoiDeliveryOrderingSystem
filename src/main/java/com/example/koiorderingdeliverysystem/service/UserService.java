package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.entity.Customers;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.repository.CustomerRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public Users register(Users user) {
        user.setRoles("customer");
        Users newUser = userRepository.save(user);

        Customers newCustomer = new Customers();
        newCustomer.setEmail(user.getEmail());
        newCustomer.setCustomerName(user.getName());

        customerRepository.save(newCustomer);

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

    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .requestMatchers("/orders/**").hasRole("STAFF")
                .anyRequest().authenticated();
    }
}

