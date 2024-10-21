package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.dto.KoiServiceDto;
import com.example.koiorderingdeliverysystem.entity.KoiService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.koiorderingdeliverysystem.repository.KoiServiceRepository;

import java.util.List;
import java.util.Optional;

@Service
public class KoiServiceService {
    @Autowired
    private KoiServiceRepository koiServiceRepository;

    public List<KoiService> getAllServices() {
        return koiServiceRepository.findAll();
    }

    public KoiService addService(KoiServiceDto koiServiceDto) {
        KoiService koiService = new KoiService();
        koiService.setServiceName(koiServiceDto.getServiceName());
        koiService.setDescription(koiServiceDto.getDescription());
        return koiServiceRepository.save(koiService);
    }

    public KoiService updateService(Long serviceId, KoiServiceDto koiServiceDto) {
        Optional<KoiService> optionalService = koiServiceRepository.findById(String.valueOf(serviceId));
        if (optionalService.isPresent()) {
            KoiService koiService = optionalService.get();
            koiService.setServiceName(koiServiceDto.getServiceName());
            koiService.setDescription(koiServiceDto.getDescription());
            return koiServiceRepository.save(koiService);
        }
        throw new EntityNotFoundException("Service not found");
    }
    public void deleteService(Long serviceId) {
        koiServiceRepository.deleteById(String.valueOf(serviceId));
    }
}
