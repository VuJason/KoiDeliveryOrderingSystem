package com.example.koiorderingdeliverysystem.dto.request;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Data
public class KoiFishRequest {
    private String name;
    private double fish_weight;
    private List<MultipartFile> images;
    private String status;

}
