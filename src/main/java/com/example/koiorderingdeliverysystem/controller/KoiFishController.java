package com.example.koiorderingdeliverysystem.controller;

import com.example.koiorderingdeliverysystem.dto.request.KoiFishRequest;
import com.example.koiorderingdeliverysystem.dto.response.KoiFishResponse;
import com.example.koiorderingdeliverysystem.entity.KoiFish;
import com.example.koiorderingdeliverysystem.exception.EntityNotFoundException;
import com.example.koiorderingdeliverysystem.service.KoiFishService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/koifish")
@SecurityRequirement(name="api")
public class KoiFishController {

    @Autowired
    private KoiFishService koiFishService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<KoiFishResponse> createKoi(@ModelAttribute KoiFishRequest koiFishRequest){
        try {
            KoiFishResponse koiFishResponse = koiFishService.createKoi(koiFishRequest);

            return ResponseEntity.ok(koiFishResponse);
        }catch (IOException e){
            throw new EntityNotFoundException("Error upload file");
        }

    }

    @GetMapping
    public List<KoiFishResponse> getAllKoiFish() {
        return koiFishService.getAllKoiFish();
    }

    @PutMapping("/{koiId}/status")
    public ResponseEntity<KoiFishResponse> updateKoiStatus(@PathVariable int koiId, @RequestParam String status) {
        KoiFishResponse koiFishResponse = koiFishService.updateKoiStatus(koiId, status);
        return ResponseEntity.ok(koiFishResponse);
    }
}
