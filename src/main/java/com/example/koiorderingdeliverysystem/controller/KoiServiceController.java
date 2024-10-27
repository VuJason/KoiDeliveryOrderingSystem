package com.example.koiorderingdeliverysystem.controller;


import com.example.koiorderingdeliverysystem.dto.KoiServiceDto;
import com.example.koiorderingdeliverysystem.entity.KoiService;
import com.example.koiorderingdeliverysystem.service.KoiServiceService;
import com.example.koiorderingdeliverysystem.repository.KoiServiceRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff/services")
@CrossOrigin(origins = "https://localhost:8080")
@SecurityRequirement(name = "api")
@PreAuthorize("hasAuthority('STAFF')")
public class KoiServiceController {
    @Autowired
    private KoiServiceService koiServiceService;


    @GetMapping("/viewService")
    public List<KoiService> getAllServices() {
        return koiServiceService.getAllServices();
    }

    @PostMapping("/addService")
    public ResponseEntity<KoiService> addService(@RequestBody KoiServiceDto koiServiceDto) {
        KoiService newService = koiServiceService.addService(koiServiceDto);
        return new ResponseEntity<>(newService, HttpStatus.CREATED);
    }
    @PutMapping("/update/{serviceId}")
    public ResponseEntity<KoiService> updateService(@PathVariable Long serviceId, @RequestBody KoiServiceDto koiServiceDto) {
        KoiService updatedService = koiServiceService.updateService(serviceId, koiServiceDto);
        return new ResponseEntity<>(updatedService, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{serviceId}")
    public ResponseEntity<Void> deleteService(@PathVariable Long serviceId) {
        koiServiceService.deleteService(serviceId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
