package com.example.koiorderingdeliverysystem.repository;

import com.example.koiorderingdeliverysystem.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customers, String> {
}
