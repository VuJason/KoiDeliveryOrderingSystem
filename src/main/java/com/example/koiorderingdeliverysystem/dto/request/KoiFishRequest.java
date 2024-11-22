package com.example.koiorderingdeliverysystem.dto.request;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Data
public class KoiFishRequest {
    private String name;
    @Positive(message = "weight must be positive")
    private double fish_weight;
    private List<MultipartFile> images;
    private String status;

}
