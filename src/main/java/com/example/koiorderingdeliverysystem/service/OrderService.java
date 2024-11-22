package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.dto.*;
import com.example.koiorderingdeliverysystem.dto.request.KoiFishDto;
import com.example.koiorderingdeliverysystem.dto.request.OrderDetailDto;
import com.example.koiorderingdeliverysystem.dto.request.OrderRequestDto;
import com.example.koiorderingdeliverysystem.dto.response.OrderResponse;
import com.example.koiorderingdeliverysystem.entity.*;
import com.example.koiorderingdeliverysystem.exception.DuplicateUserException;
import com.example.koiorderingdeliverysystem.exception.EntityNotFoundException;
import com.example.koiorderingdeliverysystem.exception.ResourceNotFoundException;
import com.example.koiorderingdeliverysystem.exception.StatusException;
import com.example.koiorderingdeliverysystem.repository.KoiServiceRepository;
import com.example.koiorderingdeliverysystem.repository.OrderServicesRepository;
import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import com.example.koiorderingdeliverysystem.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Comparator;
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

    @Autowired
    private EmailService emailService;

    public OrderResponse placeOrder(OrderRequestDto orderRequestDto) {


            Users customer = userService.getCurrentAccount();

            Orders order = modelMapper.map(orderRequestDto, Orders.class);
            order.setCustomer(customer);
            order.setOrder_date(new Date());
            order.setStatus(String.valueOf(OrderStatus.PENDING));

            Date paymentDeadline = new Date(System.currentTimeMillis() + 15 * 1000 * 60); // 5 phút sau
            order.setPaymentDeadline(paymentDeadline);
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

    public OrderResponse updatePaymentStatus(int orderId) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        order.setPaid(true);
        Orders savedOrder = ordersRepository.save(order);

        OrderResponse response = new OrderResponse();
        response.setId(savedOrder.getId());
        response.setTotalCost(savedOrder.getTotal());
        response.setStatus(String.valueOf(savedOrder.getStatus()));
        return response;
    }

    @Transactional
    public void cancelExpiredOrders() {
        List<Orders> expiredOrders = ordersRepository.findAllByStatus(String.valueOf(OrderStatus.PENDING))
                .stream()
                .filter(order -> !order.isPaid() && // Thêm điều kiện kiểm tra isPaid
                        order.getPaymentDeadline() != null &&
                        order.getPaymentDeadline().before(new Date()))
                .collect(Collectors.toList());

        for (Orders order : expiredOrders) {
            order.setStatus(String.valueOf(OrderStatus.CANCELED));
            ordersRepository.save(order);
        }
    }



    public Orders approveOrder(int orderId, int staffId) {
        Orders order = ordersRepository.findOrdersById(orderId);


        if (!order.isPaid()) {
            throw new RuntimeException("Order has not been paid yet. Cannot approve.");
        }

        Users staff = userRepository.findUsersById(staffId);


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
            history.setStatus(String.valueOf(order.getStatus()));
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
            dto.setPrice(order.getTotal());
            return dto;
        }).collect(Collectors.toList());
    }


    public OrderDto updateOrderStatus(OrderDto orderDTO) {

        Orders order = ordersRepository.findById(orderDTO.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(orderDTO.getOrderStatus().toUpperCase());
        ordersRepository.save(order);
        return new OrderDto(
                order.getTransport_method(), // transport_method
                order.getDestination(),      // destination
                order.getOriginal_location(), // original_location
                order.getOrder_date(),        // order_date
                order.getStatus(),           // orderStatus
                order.getCustomer().getFullname(),     // customerName
                order.getId()   // orderId
        );
    }

    public OrderDto assignDeliveryStaff(int orderId, int deliveryStaffId) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));


        if (!OrderStatus.APPROVED.toString().equals(order.getStatus())) {
            throw new StatusException("Order must be in APPROVED status to assign delivery staff.");
        }


        if (order.getAssignedTo() != null) {
            throw new DuplicateUserException("Order has already been assigned to delivery staff: "
                    + order.getAssignedTo().getFullname());
        }


        Users deliveryStaff = userRepository.findById(deliveryStaffId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery staff not found"));


        if (!Roles.DELIVERY_STAFF.equals(deliveryStaff.getRoles())) {
            throw new EntityNotFoundException("Selected user must have DELIVERY_STAFF role.");
        }

        if(DeliveryStaffStatus.FULL.toString().equals(deliveryStaff.getDeliveryStaff_status()) || DeliveryStaffStatus.PICK_UP.toString().equals(deliveryStaff.getDeliveryStaff_status())  || DeliveryStaffStatus.SHIPPING.toString().equals(deliveryStaff.getDeliveryStaff_status())) {
            throw new StatusException("Delivery staff is full or shipping.");
        }


        order.setAssignedTo(deliveryStaff);
        ordersRepository.save(order);

        return new OrderDto(
                order.getTransport_method(),
                order.getDestination(),
                order.getOriginal_location(),
                order.getOrder_date(),
                order.getStatus(),
                order.getCustomer().getFullname(),
                order.getId(),
                deliveryStaffId
        );
    }

    public List<OrderDto> getOrdersByDeliveryStaffId(int deliveryStaffId) {
        // Lấy danh sách các đơn hàng mà delivery staff được phân bổ
        List<Orders> orders = ordersRepository.findAllByAssignedToId(deliveryStaffId);
        if (orders.isEmpty()) {
            throw new EntityNotFoundException("No orders found for delivery staff with ID: " + deliveryStaffId);
        }

        return orders.stream().map(order -> {
            OrderDto dto = new OrderDto(
                    order.getTransport_method(),
                    order.getDestination(),
                    order.getOriginal_location(),
                    order.getOrder_date(),
                    order.getStatus(),
                    order.getCustomer().getFullname(),
                    order.getId()
            );
            dto.setOrderId(order.getId());
            dto.setCustomerName(order.getCustomer().getFullname());
            dto.setOrder_date(order.getOrder_date());
            dto.setDestination(order.getDestination());
            dto.setOriginal_location(order.getOriginal_location());
            dto.setPrice(order.getTotal());
            dto.setTransport_method(order.getTransport_method());
            dto.setOrderStatus(String.valueOf(order.getStatus()));
            return dto;
        }).collect(Collectors.toList());
    }

    public int getOrderCountByDeliveryStaffId(int deliveryStaffId) {
        // Truy vấn số lượng đơn hàng đã được gán cho nhân viên giao hàng
        return ordersRepository.countByAssignedToId(deliveryStaffId);
    }

    public Orders deleteOrder(int orderId) {
        Optional<Orders> optionalOrder = getOrderById(orderId);

        // Kiểm tra xem đơn hàng có tồn tại không
        if (optionalOrder.isPresent()) {
            Orders order = optionalOrder.get();
            order.setStatus(String.valueOf(OrderStatus.CANCELED)); // Cập nhật trạng thái thành CANCELLED
            ordersRepository.save(order); // Lưu thay đổi vào cơ sở dữ liệu

            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setReceiver(order.getCustomer());
            emailDetail.setSubject("Order Cancellation Notification");
            emailDetail.setReason("Your order cancelled due to the fish's health condition not meeting requirements.");
            emailDetail.setCreateOrder(order.getOrder_date());
            emailDetail.setLink("https://www.google.com/");
            emailService.sendEmail(emailDetail, "orderCancellation");
            return order; // Trả về đơn hàng đã cập nhật


        } else {
            throw new ResourceNotFoundException("Order not found"); // Ném ngoại lệ nếu không tìm thấy đơn hàng
        }
    }

    public Orders cancelOrder(int orderId) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        // Cập nhật trạng thái đơn hàng thành CANCELED
        order.setStatus(String.valueOf(OrderStatus.CANCELED));
        ordersRepository.save(order); // Lưu thay đổi vào cơ sở dữ liệu

        // Gửi email thông báo lý do hủy
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setReceiver(order.getCustomer());
        emailDetail.setSubject("Order Cancellation Notification");
        emailDetail.setReason("Your order cancelled due to the fish's health condition not meeting requirements.");
        emailDetail.setCreateOrder(order.getOrder_date());
        emailDetail.setLink("http://localhost:5173/browser-track");
        emailService.sendEmail(emailDetail, "orderCancellation");

        return order; // Trả về đơn hàng đã cập nhật
    }




    public Optional<Orders> getOrderById(int orderId) {
        return ordersRepository.findById(orderId);
    }

    public Orders getCurrentOrder() {

        Users currentUser = userService.getCurrentAccount();


        List<Orders> currentOrder = ordersRepository.findOrdersByCustomerAndStatus(currentUser, OrderStatus.PENDING.toString());

        if(currentOrder == null) {
            throw new EntityNotFoundException("No pending order found. Please place an order first.");
        }

        return currentOrder.stream()
                .max(Comparator.comparing(Orders::getOrder_date)) // Tìm đơn hàng mới nhất
                .orElseThrow(() -> new EntityNotFoundException("No pending order found. Please place an order first."));
    }

    public void completeDelivery(int orderId) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));


        if (!OrderStatus.COMPLETED.toString().equals(order.getStatus())) {
            throw new StatusException("Order must be in COMPLETED status to complete delivery.");
        }


        Users deliveryStaff = order.getAssignedTo();
        if (deliveryStaff != null) {

            order.setAssignedTo(null);
            ordersRepository.save(order);


            userRepository.save(deliveryStaff);
        }
    }

    public OrderDetailDto viewOrderDetail(int orderId) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        OrderDetailDto orderDetailDto = new OrderDetailDto();
        orderDetailDto.setOrderId(order.getId());
        orderDetailDto.setCustomerName(order.getCustomer().getFullname());
        orderDetailDto.setTotalCost(order.getTotal());
        orderDetailDto.setStatus(String.valueOf(order.getStatus()));


        List<KoiFish> koiFishes = order.getKoiFish();
        orderDetailDto.setKoiFishes(koiFishes.stream().map(koiFish -> {
            KoiFishDto koiFishDto = new KoiFishDto();
            koiFishDto.setId(koiFish.getId());
            koiFishDto.setKoiName(koiFish.getKoi_name());
            koiFishDto.setFishWeight(koiFish.getFish_weight());
            koiFishDto.setImagePath(koiFish.getImagePath());
            koiFishDto.setStatus(koiFish.getStatus());
            return koiFishDto;
        }).collect(Collectors.toList()));

        return orderDetailDto;
    }



}