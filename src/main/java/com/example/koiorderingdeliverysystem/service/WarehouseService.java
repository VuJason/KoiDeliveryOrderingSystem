package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.entity.Warehouse;
import com.example.koiorderingdeliverysystem.exception.ResourceNotFoundException;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.WarehouseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class WarehouseService {

    @Autowired
    private DistanceService distanceService;

    @Autowired
    private OrdersRepository orderRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public Warehouse getWarehouseById(Integer id) {
        return warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
    }

    public Warehouse updateWarehouse(Integer id, Warehouse updatedWarehouse) {
        Warehouse existingWarehouse = getWarehouseById(id);
        existingWarehouse.setName(updatedWarehouse.getName());
        existingWarehouse.setAddress(updatedWarehouse.getAddress());
        return warehouseRepository.save(existingWarehouse);
    }

    public void deleteWarehouse(Integer id) {
        Warehouse warehouse = getWarehouseById(id);
        warehouseRepository.delete(warehouse);
    }


    public Orders assignOrderToNearestWarehouse(Integer orderId) {
        // Retrieve the order by ID
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        // Get the original location from the order
        String originalLocation = order.getOriginal_location();

        // Find the nearest warehouse
        Warehouse nearestWarehouse = warehouseRepository.findAll().stream()
                .min(Comparator.comparingDouble(warehouse -> {
                    String distanceResult = distanceService.getDistance(originalLocation, warehouse.getAddress());
                    try {
                        return Double.parseDouble(distanceResult);
                    } catch (NumberFormatException e) {
                        return Double.MAX_VALUE;
                    }
                }))
                .orElse(null);

        if (nearestWarehouse != null) {
            // Assign the order to the nearest warehouse
            order.setWarehouseId(nearestWarehouse.getId());
            nearestWarehouse.getOrderIds().add(orderId);

            // Save the updated order and warehouse
            orderRepository.save(order);
            warehouseRepository.save(nearestWarehouse);
        }

        return order;
    }
}