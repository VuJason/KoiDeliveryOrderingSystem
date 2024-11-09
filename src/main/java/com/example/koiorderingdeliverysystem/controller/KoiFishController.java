//package com.example.koiorderingdeliverysystem.controller;
//
//import com.example.koiorderingdeliverysystem.dto.request.KoiFishRequest;
//import com.example.koiorderingdeliverysystem.entity.KoiFish;
//import com.example.koiorderingdeliverysystem.service.KoiFishService;
//import io.swagger.v3.oas.annotations.security.SecurityRequirement;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//@RequestMapping("/api/koifish")
//@SecurityRequirement(name="api")
//public class KoiFishController {
//
//    @Autowired
//    private KoiFishService koiFishService;
//
//    @PostMapping(value = "/content", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<KoiFish> createKoiFish(@ModelAttribute KoiFishRequest koiFishRequest,
//                                                 @RequestParam("images") List<MultipartFile> images) {
//        KoiFish newKoiFish = koiFishService.createKoi(koiFishRequest, images);
//        return ResponseEntity.ok(newKoiFish);
//    }
//}
