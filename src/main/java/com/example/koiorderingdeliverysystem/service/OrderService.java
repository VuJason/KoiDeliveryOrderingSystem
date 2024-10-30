package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.dto.*;
import com.example.koiorderingdeliverysystem.entity.*;
import com.example.koiorderingdeliverysystem.exception.ResourceNotFoundException;
import com.example.koiorderingdeliverysystem.repository.KoiServiceRepository;
import com.example.koiorderingdeliverysystem.repository.OrderServicesRepository;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private KoiServiceRepository serviceRepository;

    @Autowired
    private OrderServicesRepository orderServicesRepository;

    public OrderResponse placeOrder(OrderRequestDto orderRequestDto) {
        

       Users customer = userService.getCurrentAccount();

       Orders order = modelMapper.map(orderRequestDto, Orders.class);
       order.setCustomer(customer);
       order.setOrder_date(new Date());
       order.setStatus(OrderStatus.PENDING.toString().toUpperCase());
       Orders savedOrder = ordersRepository.save(order);

        if (orderRequestDto.getAdditional_services() != null && !orderRequestDto.getAdditional_services().isEmpty()) {
            String[] additionalServices = orderRequestDto.getAdditional_services().split(",");

            for (String serviceName : additionalServices) {

                serviceName = serviceName.trim();


                KoiService service = serviceRepository.findKoiServiceByServiceName(serviceName);
                if (service != null) {

                    OrderServices orderService = new OrderServices();
                    orderService.setOrders(savedOrder);
                    orderService.setServices(service);


                    orderServicesRepository.save(orderService);
                }
            }
        }


        return modelMapper.map(savedOrder, OrderResponse.class);

    }



    public Orders approveOrder(int orderId, int staffId) {
        Orders order = ordersRepository.findOrdersById(orderId);


        Users staff = userRepository.findUsersById(staffId);

        // Kiểm tra vai trò của nhân viên
        if (!staff.getRoles().equals("Staff")) {
            throw new RuntimeException("User is not authorized to approve orders");
        }

        order.setApprovedBy(staff);
        order.setStatus("Approved");  // Cập nhật trạng thái
        Orders newOrder = ordersRepository.save(order);
        return newOrder;
    }


    public List<OrderHistory> getAllOrders() {
        List<Orders> orders = ordersRepository.findAll();
        return orders.stream().map(order -> {
            OrderHistory history = new OrderHistory();
            history.setId(order.getId());
            history.setCustomerName(order.getCustomer().getFullname());
            history.setDestination(order.getDestination());
            history.setOrder_date(order.getOrder_date());
            history.getPrice();
            history.setStatus(order.getStatus());
            return history;
        }).collect(Collectors.toList());
    }
    public List<OrderDto> getOrders() {
        List<Orders> orders = ordersRepository.findAll();
        return orders.stream().map(order -> {
            OrderDto dto = new OrderDto();
            dto.setOrderId(order.getId());
            dto.setCustomerName(order.getCustomer().getFullname());
            dto.setOrder_date(order.getOrder_date());
            dto.setDestination(order.getDestination());
            dto.setOriginal_location(order.getOriginal_location());
            dto.setTransport_method(order.getTransport_method());
            dto.setOrderStatus(order.getStatus());
            return dto;
        }).collect(Collectors.toList());
    }


    public OrderDto updateOrderStatus(OrderDto orderDTO) {
        // Lấy đơn hàng từ database bằng orderId
        Orders order = ordersRepository.findById(orderDTO.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(orderDTO.getOrderStatus());
        ordersRepository.save(order);
        return new OrderDto(
                order.getTransport_method(), // transport_method
                order.getDestination(),      // destination
                order.getOriginal_location(), // original_location
                order.getOrder_date(),        // order_date
                order.getStatus(),           // orderStatus
                order.getCustomer().getFullname(),     // customerName
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
                order.getCustomer().getFullname(),     // customerName
                order.getId(),        // orderId
                deliveryStaffId// Gán ID nhân viên giao hàng vào DTO
        );
    }

    private String generateOrderId() {

//        String lastOrderId = ordersRepository.findMaxOrderId();
//        if (lastOrderId == null) {
//            return "U001";
//        }
//
//
//        int numberPart = Integer.parseInt(lastOrderId.substring(1));
//        int newOrderNumber = numberPart + 1;
//
//
//        return String.format("U%03d", newOrderNumber);
        return null;
    }

}
