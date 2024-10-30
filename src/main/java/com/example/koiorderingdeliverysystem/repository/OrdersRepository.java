package com.example.koiorderingdeliverysystem.repository;
import com.example.koiorderingdeliverysystem.entity.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrdersRepository extends JpaRepository<Orders, Integer> {

    Orders findOrdersById(int id);
    List<Orders> findAllByStatus(String status);  // To find orders by status

    Page<Orders> findAll(Pageable pageable);
}

