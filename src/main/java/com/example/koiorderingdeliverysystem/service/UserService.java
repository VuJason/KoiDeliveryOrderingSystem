package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.*;
//import com.example.koiorderingdeliverysystem.entity.Customers;
import com.example.koiorderingdeliverysystem.dto.request.ForgotPasswordRequest;
import com.example.koiorderingdeliverysystem.dto.request.LoginDto;
import com.example.koiorderingdeliverysystem.dto.request.RegistrationDto;
import com.example.koiorderingdeliverysystem.dto.response.DeliveryStaffResponse;
import com.example.koiorderingdeliverysystem.dto.response.RegistrationResponse;
import com.example.koiorderingdeliverysystem.dto.response.UpdateResponse;
import com.example.koiorderingdeliverysystem.dto.response.UserResponse;
import com.example.koiorderingdeliverysystem.entity.DeliveryStaffStatus;
import com.example.koiorderingdeliverysystem.entity.Roles;
import com.example.koiorderingdeliverysystem.entity.Users;
//import com.example.koiorderingdeliverysystem.repository.CustomerRepository;
import com.example.koiorderingdeliverysystem.exception.DuplicateUserException;
import com.example.koiorderingdeliverysystem.exception.EntityNotFoundException;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

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
    @Autowired
    private EmailService emailService;
    @Autowired
    private OrderService orderService;

    public RegistrationResponse register(RegistrationDto register) {

        Users existedUser = userRepository.findUsersByEmail(register.getEmail());
        if (existedUser != null) {
            throw new DuplicateUserException("User with this email already exists");
        }
        Users user = modelMapper.map(register, Users.class);
        try {
            String originalPassword = user.getPassword();
            user.setPassword(passwordEncoder.encode(originalPassword));
            user.setRegistration_date(new Date(System.currentTimeMillis()));


            if (register.getRole() == null || register.getRole().isEmpty()) {
                user.setRoles(Roles.CUSTOMER);
            } else {
                try {

                    Roles role = Roles.valueOf(register.getRole().toString().toUpperCase().replace(" ", "_"));
                    user.setRoles(role);
                } catch (IllegalArgumentException e) {
                    throw new RuntimeException("Invalid role: " + register.getRole());
                }
            }

            if (user.getRoles().equals(Roles.DELIVERY_STAFF)) {
                user.setDeliveryStaff_status(DeliveryStaffStatus.FREE.toString());
            }

            Users newUser = userRepository.save(user);

            //gửi email về người dùng
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setReceiver(newUser);
            emailDetail.setSubject("welcome to koi delivery");
            emailDetail.setLink("https://www.google.com/");
            emailService.sendEmail(emailDetail, "registration");

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

    public List<UserResponse> getAllUser() {
        List<Users> userResponse = userRepository.findUsersByStatusTrue();
        return userResponse.stream().map(user -> {
            UserResponse users = new UserResponse();
            users.setId(user.getId());
            users.setUsername(user.getUsername());
            users.setEmail(user.getEmail());
            users.setPhone(user.getPhone());
            return users;
        }).collect(Collectors.toList());
    }

    public List<DeliveryStaffResponse> getDeliveryStaffUsers() {
        List<Users> deliveryStaffUsers = userRepository.findUsersByRolesAndStatusTrue(Roles.DELIVERY_STAFF);

        return deliveryStaffUsers.stream().map(user -> {
            DeliveryStaffResponse userResponse = new DeliveryStaffResponse();
            userResponse.setId(user.getId());
            userResponse.setFullName(user.getFullname());
            userResponse.setEmail(user.getEmail());
            userResponse.setPhone(user.getPhone());
            int orderCount = orderService.getOrderCountByDeliveryStaffId(user.getId());
            if(orderCount >= 5) {
               user.setDeliveryStaff_status(DeliveryStaffStatus.FULL.toString());
            }else {
                user.setDeliveryStaff_status(DeliveryStaffStatus.FREE.toString());
            }
            userRepository.save(user);
            userResponse.setOrderCount(orderCount);
            userResponse.setDeliveryStaffStatus(user.getDeliveryStaff_status());
            return userResponse;
        }).collect(Collectors.toList());
    }

    public DeliveryStaffResponse updateDeliveryStaffStatus(int deliveryStaffId, String status) {
        if (deliveryStaffId < 0) {
            throw new IllegalArgumentException("Delivery staff ID cannot be negative.");
        }
        Users deliveryStaff = userRepository.findUsersById(deliveryStaffId);
        if (deliveryStaff == null) {
            throw new EntityNotFoundException("Delivery staff with ID " + deliveryStaffId + " not found.");
        }
        deliveryStaff.setDeliveryStaff_status(status.toUpperCase().replace(" ", "_"));
        deliveryStaff = userRepository.save(deliveryStaff);
        DeliveryStaffResponse deliveryStaffResponse = modelMapper.map(deliveryStaff, DeliveryStaffResponse.class);
        return deliveryStaffResponse;

    }

    public UpdateResponse updateCustomerProfile(UpdateProfile updateProfile) {
        Users currentUser = getCurrentAccount();
        if(currentUser == null) {
            throw new EntityNotFoundException("Customer not found!");
        }
        currentUser.setFullname(updateProfile.getFullName());
        currentUser.setPhone(updateProfile.getPhone());
        currentUser.setAddress(updateProfile.getAddress());
        Users updatedUser = userRepository.save(currentUser);
        return modelMapper.map(updatedUser, UpdateResponse.class);


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
        Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user;
    }

    public void forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        Users users = userRepository.findUsersByEmail(forgotPasswordRequest.getEmail());
        if(users == null) {
            throw new EntityNotFoundException("User not found!");
        }else {
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setReceiver(users);
            emailDetail.setSubject("welcome to koi delivery");
            emailDetail.setLink("https://www.google.com/" + tokenService.generateToken(users));
            emailService.sendEmail(emailDetail, "registration");

        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUsersByEmail(email);
    }

    public UserResponse getCurrentUserInfo() {
        Users currentUser = getCurrentAccount();
        if(currentUser == null) {
            throw new EntityNotFoundException("User not found!");
        }
        return modelMapper.map(currentUser, UserResponse.class);
    }



}

