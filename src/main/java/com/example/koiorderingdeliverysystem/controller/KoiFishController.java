package com.example.koiorderingdeliverysystem.controller;



import com.example.koiorderingdeliverysystem.dto.request.KoiFishRequest;
import com.example.koiorderingdeliverysystem.dto.response.KoiFishResponse;
import com.example.koiorderingdeliverysystem.entity.KoiFish;
import com.example.koiorderingdeliverysystem.service.KoiFishService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/koifish")
@SecurityRequirement(name="api")
public class KoiFishController {

    @Autowired
    private KoiFishService koiFishService;

    @PostMapping()
    public ResponseEntity<KoiFishResponse> createKoiFish(@RequestBody KoiFishRequest koiFishRequest) {
        KoiFishResponse newKoiFish = koiFishService.createKoi(koiFishRequest);
        return ResponseEntity.ok(newKoiFish);
    }

    @GetMapping
    public List<KoiFish> getAllKoiFish() {
        return koiFishService.getAllKoiFish();
    }
}
