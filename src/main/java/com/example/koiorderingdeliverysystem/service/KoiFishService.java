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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class KoiFishService {

    private final Path rootLocation = Paths.get("uploads");

    @Autowired
    private KoiFishRepository koiFishRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ModelMapper modelMapper;

    public KoiFishService() throws IOException {
        Files.createDirectories(rootLocation);
    }

    public KoiFishResponse createKoi(KoiFishRequest koiFishRequest) throws IOException {

            Users currentUser = userService.getCurrentAccount();
            Orders currentOrder = orderService.getCurrentOrder();

            KoiFish koiFish = new KoiFish();
            koiFish.setKoi_name(koiFishRequest.getName());
            koiFish.setFish_weight(koiFishRequest.getFish_weight());
            koiFish.setCustomer_koi(currentUser);
            koiFish.setOrder(currentOrder);
            koiFish.setStatus(koiFishRequest.getStatus().toUpperCase());

            List<String> imagePath = new ArrayList<>();

            if(koiFishRequest.getImages() != null && !koiFishRequest.getImages().isEmpty()) {
                for (MultipartFile image : koiFishRequest.getImages()) {
                    if(!image.isEmpty()) {
                        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
                        Path filePath = rootLocation.resolve(fileName);
                        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                        imagePath.add(filePath.toString());
                    }

                }

                koiFish.setImagePath(String.join(",", imagePath));

            }


            koiFish = koiFishRepository.save(koiFish);
            KoiFishResponse koiFishResponse = modelMapper.map(koiFish, KoiFishResponse.class);
            return koiFishResponse;


    }



    public List<KoiFishResponse> getAllKoiFish() {
        List<KoiFish> koiFishList = koiFishRepository.findAll();
        if(koiFishList.isEmpty()) {
            throw new EntityNotFoundException("No KoiFish found: ");
        }

        return koiFishList.stream().map(koiFish -> {
            KoiFishResponse koiFishResponse = new KoiFishResponse();
            koiFishResponse.setId(koiFish.getId());
            koiFishResponse.setKoi_name(koiFish.getKoi_name());
            koiFishResponse.setFish_weight(koiFish.getFish_weight());
            koiFishResponse.setStatus(koiFish.getStatus());
            return koiFishResponse;
        }).collect(Collectors.toList());

    }

    public KoiFishResponse updateKoiStatus(int koiID, String status) {
        KoiFish koi = koiFishRepository.findById(koiID)
                .orElseThrow(() -> new EntityNotFoundException("No KoiFish found for ID: " + koiID));
        koi.setStatus(status.toUpperCase());
        koi = koiFishRepository.save(koi);
        KoiFishResponse koiFishResponse = modelMapper.map(koi, KoiFishResponse.class);
        return koiFishResponse;
    }


}