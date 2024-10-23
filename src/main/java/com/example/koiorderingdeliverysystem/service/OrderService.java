package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.dto.LoginDto;
import com.example.koiorderingdeliverysystem.dto.OrderDto;
import com.example.koiorderingdeliverysystem.dto.OrderRequestDto;
import com.example.koiorderingdeliverysystem.dto.OrderResponse;
import com.example.koiorderingdeliverysystem.entity.OrderStatus;
import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.exception.ResourceNotFoundException;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
//        if (!customer.getRoles().getRole_name().equalsIgnoreCase("Customer")) {
//            throw new RuntimeException("User is not authorized to place orders");
//        }

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
    public List<OrderDto> getOrders() {
        List<Orders> orders = ordersRepository.findAll();
        return orders.stream().map(order -> {
            OrderDto dto = new OrderDto();
            dto.setOrderId(order.getId());
            dto.setCustomerName(order.getCustomerId().getFullname());
            dto.setOrder_date(order.getOrder_date());
            dto.setDestination(order.getDestination());
            dto.setOriginal_location(order.getOriginal_location());
            dto.setTransport_method(order.getTransport_method());
            dto.setOrderStatus(order.getStatus());
            return dto;
        }).collect(Collectors.toList());
    }


    public OrderDto updateOrderStatus(OrderDto orderDto) {
        // Lấy đơn hàng từ database bằng orderId
        Orders order = ordersRepository.findById(orderDto.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(orderDto.getOrderStatus());
        ordersRepository.save(order);
        return new OrderDto(
                order.getTransport_method(), // transport_method
                order.getDestination(),      // destination
                order.getOriginal_location(), // original_location
                order.getOrder_date(),        // order_date
                order.getStatus(),           // orderStatus
                order.getCustomerId().getFullname(),     // customerName
                order.getId()           // orderId
        );
    }

    public OrderDto assignDeliveryStaff(Integer orderId, Integer deliveryStaffId) {
        // Lấy đơn hàng từ database bằng orderId
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        // Kiểm tra trạng thái của đơn hàng
        if (!"Approved".equals(order.getStatus())) {
            throw new IllegalArgumentException("Order must be approved to assign delivery staff.");
        }

        // Lấy thông tin nhân viên giao hàng từ database
        Users deliveryStaff = userRepository.findById(deliveryStaffId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery staff not found"));

        // Cập nhật nhân viên giao hàng
        order.setAssignedTo(deliveryStaff);

        // Lưu thay đổi vào database
        ordersRepository.save(order);

        // Tạo OrderDTO từ đơn hàng đã cập nhật
        return new OrderDto(order.getTransport_method(), // transport_method
                order.getDestination(),      // destination
                order.getOriginal_location(), // original_location
                order.getOrder_date(),        // order_date
                order.getStatus(),           // orderStatus
                order.getCustomerId().getFullname(),     // customerName
                order.getId(),        // orderId
                deliveryStaffId// Gán ID nhân viên giao hàng vào DTO
        );
    }

    public List<OrderDto> getOrdersAssignedToDeliveryStaff(Integer deliveryStaffId) {
        List<Orders> orders = ordersRepository.findByAssignedTo(deliveryStaffId);
        return orders.stream().map(order -> {
            OrderDto dto = new OrderDto();
            dto.setOrderId(order.getId());
            dto.setCustomerName(order.getCustomerId().getFullname());
            dto.setOrder_date(order.getOrder_date());
            dto.setDestination(order.getDestination());
            dto.setOriginal_location(order.getOriginal_location());
            dto.setTransport_method(order.getTransport_method());
            dto.setOrderStatus(order.getStatus());
            return dto;
        }).collect(Collectors.toList());
    }

    public OrderDto updateOrderStatusByDeliveryStaff(OrderDto orderDto) {
        Orders order = ordersRepository.findById(orderDto.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(orderDto.getOrderStatus());
        ordersRepository.save(order);
        return new OrderDto(
                order.getTransport_method(), // transport_method
                order.getDestination(),      // destination
                order.getOriginal_location(), // original_location
                order.getOrder_date(),        // order_date
                order.getStatus(),           // orderStatus
                order.getCustomerId().getFullname(),     // customerName
                order.getId()           // orderId
        );
    }
}
