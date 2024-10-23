package com.example.koiorderingdeliverysystem.repository;
import com.example.koiorderingdeliverysystem.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrdersRepository extends JpaRepository<Orders, Integer> {
//   Orders findByOrderId(int id);
    List<Orders> findByStatus(String status);  // To find orders by status
}

