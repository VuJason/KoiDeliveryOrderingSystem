package com.example.koiorderingdeliverysystem.repository;

import com.example.koiorderingdeliverysystem.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {
    List<Warehouse> findAll();
}
