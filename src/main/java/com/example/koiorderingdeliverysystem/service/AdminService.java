package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
public class AdminService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrdersRepository ordersRepository;


    public Map<String, Objects> getDashboardStats() {

    }

    //đếm số đơn hàng trong hệ thống



    // số lượng customer


    // số lượng staff


    //doanh thu từng tháng


}
