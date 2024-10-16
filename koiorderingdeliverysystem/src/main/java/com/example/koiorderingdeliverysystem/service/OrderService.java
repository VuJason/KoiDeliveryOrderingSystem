package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.dto.OrderRequestDto;
import com.example.koiorderingdeliverysystem.dto.OrderResponse;
import com.example.koiorderingdeliverysystem.entity.OrderStatus;
import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    public OrderResponse placeOrder(OrderRequestDto orderRequestDto, String email) {
        LoginDto login = new LoginDto();
        Users customer =  modelMapper.map(login, Users.class);
        if (!customer.getRoles().getRole_name().equalsIgnoreCase("Customer")) {
            throw new RuntimeException("User is not authorized to place orders");
        }

        Orders orders = modelMapper.map(orderRequestDto, Orders.class);
        try {
            orders.setCustomerId(customer);
            orders.setOrder_date(new Date());
            orders.setStatus(String.valueOf(OrderStatus.PENDING));
            orders.setApprovedBy(null);
            orders.setAssignedTo(null);
            Orders newOrder = ordersRepository.save(orders);
            return modelMapper.map(newOrder, OrderResponse.class);
        }catch (Exception e) {
            throw new RuntimeException("Error creating user: " + e.getMessage());
        }
    }

    public Orders approveOrder(int orderId, int staffId) {
//        Orders order = ordersRepository.findByOrderId(orderId);
//
//
//        Users staff = userRepository.findById(staffId);
//
//        // Kiểm tra vai trò của nhân viên
//        if (!staff.getRoles().getRole_name().equals("Staff")) {
//            throw new RuntimeException("User is not authorized to approve orders");
//        }
//
//        order.setApprovedBy(staff);
//        order.setStatus("Approved");  // Cập nhật trạng thái
//        Orders newOrder = ordersRepository.save(order);
//        return newOrder;
        return null;
    }


    public List<Orders> getAllOrders() {
        List<Orders> orders = ordersRepository.findAll();
        return orders;
    }

    private String generateOrderId() {

//        String lastOrderId = ordersRepository.findMaxOrderId();
//        if (lastOrderId == null) {
//            return "U001";
//        }
//
//
//        int numberPart = Integer.parseInt(lastOrderId.substring(1));
//        int newOrderNumber = numberPart + 1;
//
//
//        return String.format("U%03d", newOrderNumber);
        return null;
    }
}
