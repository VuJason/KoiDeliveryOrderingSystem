package com.example.koiorderingdeliverysystem.dto.request;

import lombok.Data;

@Data
public class KoiFishDto {
    private int id;
    private String koiName; // Tên cá koi
    private double fishWeight; // Cân nặng cá koi
    private String imagePath; // Đường dẫn hình ảnh
    private String status; // Trạng thái cá koi
}
