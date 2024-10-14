package com.example.koiorderingdeliverysystem.repository;

import com.example.koiorderingdeliverysystem.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrdersRepository extends JpaRepository<Orders, String> {

    @Query("SELECT MAX(o.orderId) FROM Orders o ")
    String findMaxOrderId();

}
