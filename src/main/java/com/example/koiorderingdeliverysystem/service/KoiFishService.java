package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.request.KoiFishRequest;
import com.example.koiorderingdeliverysystem.dto.response.KoiFishResponse;
import com.example.koiorderingdeliverysystem.entity.KoiFish;
import com.example.koiorderingdeliverysystem.entity.OrderStatus;
import com.example.koiorderingdeliverysystem.entity.Orders;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.exception.EntityNotFoundException;
import com.example.koiorderingdeliverysystem.repository.KoiFishRepository;

import com.example.koiorderingdeliverysystem.repository.OrdersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//@Service
//public class KoiFishService {
//
//    @Autowired
//    private KoiFishRepository koiFishRepository;
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    private final String UPLOAD_DIR = "uploads/koi_images/"; // Thư mục lưu hình ảnh
//
//    public KoiFish createKoi(KoiFishRequest koiFishRequest, List<MultipartFile> images) {
//        Users currentUser = userService.getCurrentAccount();
//
//        KoiFish koiFish = modelMapper.map(koiFishRequest, KoiFish.class);
//        koiFish.setCustomer_koi(currentUser);
//        koiFish.setOrder((Orders) currentUser.getOrders());
//
//        List<String> imagePaths = saveImages(images); // Lưu hình ảnh và nhận đường dẫn
//        koiFish.setImagePaths(imagePaths); // Giả sử KoiFish có phương thức setImagePaths
//
//        return koiFishRepository.save(koiFish);
//    }
//
//    private List<String> saveImages(List<MultipartFile> images) {
//        List<String> imagePaths = new ArrayList<>();
//        for (MultipartFile image : images) {
//            // Kiểm tra định dạng tệp
//            if (!image.getContentType().equals("image/png")) {
//                System.out.println("Chỉ chấp nhận tệp hình ảnh PNG: " + image.getOriginalFilename());
//                continue; // Bỏ qua tệp không phải PNG
//            }
//
//            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
//            Path path = Paths.get(UPLOAD_DIR + fileName);
//            try {
//                Files.createDirectories(path.getParent()); // Tạo thư mục nếu chưa tồn tại
//                Files.write(path, image.getBytes()); // Lưu hình ảnh
//                imagePaths.add(path.toString()); // Thêm đường dẫn vào danh sách
//            } catch (IOException e) {
//                e.printStackTrace(); // Xử lý lỗi
//            }
//        }
//        return imagePaths;
//    }
//}


@Service
public class KoiFishService {

    @Autowired
    private KoiFishRepository koiFishRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ModelMapper modelMapper;

    private final String UPLOAD_DIR = "uploads/koi_images/";

    public KoiFishResponse createKoi(KoiFishRequest koiFishRequest) {
        Users currentUser = userService.getCurrentAccount();
        Orders currentOrder = orderService.getCurrentOrder();

        // Create and map basic KoiFish data
        KoiFish koiFish = new KoiFish();
        koiFish.setKoi_name(koiFishRequest.getName());
        koiFish.setFish_weight(koiFishRequest.getFish_weight());
        koiFish.setCustomer_koi(currentUser);
        koiFish.setOrder(currentOrder);
        KoiFish savedKoiFish = koiFishRepository.save(koiFish);
        KoiFishResponse koiFishResponse = modelMapper.map(savedKoiFish, KoiFishResponse.class);

// Kiểm tra xem cá Koi có lưu thành công không
        if (savedKoiFish == null) {
            throw new RuntimeException("Failed to save KoiFish to the database.");
        }

        return koiFishResponse;
    }

    public List<KoiFish> getAllKoiFish() {
        List<KoiFish> koiFishList = koiFishRepository.findAll();
        if(koiFishList.isEmpty()) {
            throw new EntityNotFoundException("No KoiFish found: ");
        }
        return koiFishList;

    }

    private List<String> saveImages(List<MultipartFile> images) {
        List<String> imagePaths = new ArrayList<>();

        try {
            // Create upload directory if it doesn't exist
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            for (MultipartFile image : images) {
                // Validate image
                if (image.isEmpty()) {
                    continue;
                }

                // Accept more image formats
                String contentType = image.getContentType();
                if (contentType != null &&
                        (contentType.equals("image/png") ||
                                contentType.equals("image/jpeg") ||
                                contentType.equals("image/jpg"))) {

                    String fileName = System.currentTimeMillis() + "_" +
                            image.getOriginalFilename();
                    Path targetPath = Paths.get(UPLOAD_DIR + fileName);

                    // Save file
                    Files.copy(image.getInputStream(), targetPath);

                    // Store relative path
                    imagePaths.add(fileName);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to store images", e);
        }

        return imagePaths;
    }
}