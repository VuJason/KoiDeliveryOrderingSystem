package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.entity.Roles;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class AdminService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrdersRepository ordersRepository;


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

        return stats;
        //doanh thu từng tháng


    }


}
