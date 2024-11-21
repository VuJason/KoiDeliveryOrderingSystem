package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.dto.response.AdminResponse;
import com.example.koiorderingdeliverysystem.dto.response.UserResponse;
import com.example.koiorderingdeliverysystem.entity.Roles;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.TransactionsRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    TransactionsRepository transactionsRepository;


    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        //đếm số đơn hàng trong hệ thống
        long totalOrders = ordersRepository.count();
        stats.put("totalOrders", totalOrders);

        // số lượng customer
        long customerCount =  userRepository.countByRole(Roles.CUSTOMER);
        stats.put("customerCount", customerCount);

        // số lượng staff
        long staffCount =  userRepository.countByRole(Roles.STAFF);
        stats.put("staffCount", staffCount);


        List<Object[]> monthlyRevenue = transactionsRepository.findMonthlyRevenue();
        Map<Integer, Double> revenueMap = new HashMap<>();
        for (Object[] row : monthlyRevenue) {
            int month = (Integer) row[0];
            double totalRevenue = (Double) row[1];
            revenueMap.put(month, totalRevenue);
        }
        stats.put("monthlyRevenue", revenueMap);

        return stats;
        //doanh thu từng tháng




    }

    public List<AdminResponse> getAllUserByAdmin() {
        List<Users> userResponse = userRepository.findUsersByStatusTrue();
        return userResponse.stream().map(user -> {
            AdminResponse users = new AdminResponse();
            users.setId(user.getId());
            users.setUsername(user.getUsername());
            users.setEmail(user.getEmail());
            users.setPhone(user.getPhone());
            users.setRole(String.valueOf(user.getRoles()));
            return users;
        }).collect(Collectors.toList());
    }



}
