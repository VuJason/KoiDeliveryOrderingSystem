package com.example.koiorderingdeliverysystem.dto.response;

import lombok.Data;

@Data
public class KoiFishResponse {
    private int id;
    private String koi_name;
    private double fish_weight;
    private String status;

}
