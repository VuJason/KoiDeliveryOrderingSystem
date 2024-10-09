package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.dto.OrderRequestDto;
import com.example.koiorderingdeliverysystem.entity.OrderStatus;
import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrdersRepository ordersRepository;

    public Orders placeOrder(OrderRequestDto orderRequestDto) {
        Orders orders = new Orders();


        orders.setOrderId(orderRequestDto.getOrderId());
        orders.setQuantity(orderRequestDto.getQuantity());
        orders.setFishWeight(orderRequestDto.getFishWeight());
        orders.setOriginLocation(orderRequestDto.getOriginalLocation());
        orders.setDestinationLocation(orderRequestDto.getDestination());

        
        orders.setStatus(OrderStatus.PENDING);

        String orderId = generateOrderId();
        orders.setOrderId(orderId);

        return ordersRepository.save(orders);
    }


    public List<Orders> getAllOrders() {
        List<Orders> orders = ordersRepository.findAll();
        return orders;
    }

    private String generateOrderId() {

        String lastOrderId = ordersRepository.findMaxOrderId();
        if (lastOrderId == null) {
            return "U001";
        }


        int numberPart = Integer.parseInt(lastOrderId.substring(1));
        int newOrderNumber = numberPart + 1;


        return String.format("U%03d", newOrderNumber);
    }
}
