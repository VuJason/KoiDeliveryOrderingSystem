package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.dto.*;
import com.example.koiorderingdeliverysystem.dto.request.OrderRequestDto;
import com.example.koiorderingdeliverysystem.dto.response.OrderResponse;
import com.example.koiorderingdeliverysystem.entity.*;
import com.example.koiorderingdeliverysystem.exception.EntityNotFoundException;
import com.example.koiorderingdeliverysystem.exception.ResourceNotFoundException;
import com.example.koiorderingdeliverysystem.repository.KoiServiceRepository;
import com.example.koiorderingdeliverysystem.repository.OrderServicesRepository;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
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
    private DistanceService distanceService;

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

            Date paymentDeadline = new Date(System.currentTimeMillis() + 5 * 1000 * 60); // 5 phút sau
            order.setPaymentDeadline(paymentDeadline); // Thiết lập thời gian thanh toán
            order.setPaid(false);

//        if (order.getKoiFish().isEmpty()) {
//            throw new EntityNotFoundException("Koi Fish information is empty");
//        }

            Orders savedOrder = ordersRepository.save(order);


            double distance = Double.parseDouble(distanceService.getDistance(orderRequestDto.getOriginal_location(), orderRequestDto.getDestination()));

            double totalServiceCost = 0;

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
                        totalServiceCost += service.getPrice();
                    }
                }
            }
            double fees = 0.05 * distance * orderRequestDto.getQuantity();
            double cost = fees + totalServiceCost;
            double totalCost = Math.floor(cost / 100) * 100;

            order.setTotal(totalCost);


            savedOrder = ordersRepository.save(order);
            OrderResponse response = modelMapper.map(savedOrder, OrderResponse.class);
            response.setTotalCost(totalCost);
            return response;

    }

    @Scheduled(fixedRate = 60000) // Kiểm tra mỗi phút
    @Transactional
    public void checkAndCancelExpiredOrders() {
        cancelExpiredOrders();
    }

    @Transactional
    public void cancelExpiredOrders() {
        List<Orders> expiredOrders = ordersRepository.findAllByStatus(String.valueOf(OrderStatus.PENDING))
                .stream()
                .filter(order -> order.getPaymentDeadline() != null && order.getPaymentDeadline().before(new Date()))
                .collect(Collectors.toList());

        for (Orders order : expiredOrders) {
            order.setStatus(String.valueOf(OrderStatus.CANCELED));
            ordersRepository.save(order);
        }
    }



    public Orders approveOrder(int orderId, int staffId) {
        Orders order = ordersRepository.findOrdersById(orderId);

        // Kiểm tra xem đơn hàng đã được thanh toán chưa
        if (!order.isPaid()) {
            throw new RuntimeException("Order has not been paid yet. Cannot approve.");
        }

        Users staff = userRepository.findUsersById(staffId);

        // Kiểm tra vai trò của nhân viên
        if (!staff.getRoles().equals(Roles.STAFF)) {
            throw new RuntimeException("User is not authorized to approve orders");
        }

        order.setApprovedBy(staff);
        order.setStatus(String.valueOf(OrderStatus.APPROVED));  // Cập nhật trạng thái
        return ordersRepository.save(order);
    }


    public List<OrderHistory> getCustomerOrder() {
        Users customer = userService.getCurrentAccount();
        List<Orders> orders = ordersRepository.findAllByCustomerAndStatusNot(customer, String.valueOf(OrderStatus.CANCELED));
        if(orders.isEmpty()) {
            throw new EntityNotFoundException("No orders found for customer " + customer.getUsername());
        }
        return orders.stream().map(order -> {
            OrderHistory history = new OrderHistory();
            history.setId(order.getId());
            history.setCustomerName(order.getCustomer().getFullname());
            history.setDestination(order.getDestination());
            history.setOrder_date(order.getOrder_date());
            history.setPrice(order.getTotal());
            history.setStatus(order.getStatus());
            return history;
        }).collect(Collectors.toList());

    }
    public List<OrderDto> getOrders() {
        List<Orders> orders = ordersRepository.findAllByStatusNot( String.valueOf(OrderStatus.CANCELED));
        if(orders.isEmpty()) {
            throw new EntityNotFoundException("No orders found ! ");
        };

        return orders.stream().map(order -> {
            OrderDto dto = new OrderDto();
            dto.setOrderId(order.getId());
            dto.setCustomerName(order.getCustomer().getFullname());
            dto.setOrder_date(order.getOrder_date());
            dto.setDestination(order.getDestination());
            dto.setOriginal_location(order.getOriginal_location());
            dto.setPrice(order.getTotal());
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
        if (!OrderStatus.APPROVED.equals(order.getStatus())) {
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

    public Orders deleteOrder(int orderId) {
        Optional<Orders> optionalOrder = getOrderById(orderId);

        // Kiểm tra xem đơn hàng có tồn tại không
        if (optionalOrder.isPresent()) {
            Orders order = optionalOrder.get();
            order.setStatus(String.valueOf(OrderStatus.CANCELED)); // Cập nhật trạng thái thành CANCELLED
            ordersRepository.save(order); // Lưu thay đổi vào cơ sở dữ liệu
            return order; // Trả về đơn hàng đã cập nhật
        } else {
            throw new ResourceNotFoundException("Order not found"); // Ném ngoại lệ nếu không tìm thấy đơn hàng
        }
    }




    public Optional<Orders> getOrderById(int orderId) {
        return ordersRepository.findById(orderId);
    }

    public Orders getCurrentOrder() {
        // Lấy thông tin người dùng đang đăng nhập
        Users currentUser = userService.getCurrentAccount();

        // Tìm đơn hàng PENDING của người dùng
        Orders currentOrder = ordersRepository.findOrdersByCustomerAndStatus(currentUser, OrderStatus.PENDING.toString());
        if(currentOrder == null) {
            throw new EntityNotFoundException("No pending order found. Please place an order first.");
        }

        // Chuyển đổi sang DTO
        return currentOrder;
    }

}