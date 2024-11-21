package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.entity.Warehouse;
import com.example.koiorderingdeliverysystem.service.WarehouseService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouses")
@CrossOrigin(origins = "http://localhost:5173")
@SecurityRequirement(name = "api")
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    // Create a new warehouse
    @PostMapping
    public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse createdWarehouse = warehouseService.createWarehouse(warehouse);
        return new ResponseEntity<>(createdWarehouse, HttpStatus.CREATED);
    }

    // Get all warehouses
    @GetMapping
    public ResponseEntity<List<Warehouse>> getAllWarehouses() {
        return new ResponseEntity<>(warehouseService.getAllWarehouses(), HttpStatus.OK);
    }

    // Get a warehouse by ID
    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable Integer id) {
        return new ResponseEntity<>(warehouseService.getWarehouseById(id), HttpStatus.OK);
    }

    // Update a warehouse
    @PutMapping("/{id}")
    public ResponseEntity<Warehouse> updateWarehouse(@PathVariable Integer id, @RequestBody Warehouse warehouse) {
        return new ResponseEntity<>(warehouseService.updateWarehouse(id, warehouse), HttpStatus.OK);
    }

    // Delete a warehouse
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable Integer id) {
        warehouseService.deleteWarehouse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PutMapping("/nearest/{orderId}")
    public ResponseEntity<Orders> assignOrderToNearestWarehouse(@PathVariable Integer orderId) {
        Orders updatedOrder = warehouseService.assignOrderToNearestWarehouse(orderId);
        return ResponseEntity.ok(updatedOrder);
    }
}