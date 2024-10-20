package com.example.koiorderingdeliverysystem.repository;
import com.example.koiorderingdeliverysystem.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface OrdersRepository extends JpaRepository<Orders, Integer> {
//   Orders findByOrderId(int id);
    List<Orders> findByStatus(String status);  // To find orders by status
    @Query("SELECT o FROM Orders o WHERE o.assignedTo.id = :assignedTo")
    List<Orders> findByAssignedTo(@Param("assignedTo") Integer deliveryStaffId);
}

