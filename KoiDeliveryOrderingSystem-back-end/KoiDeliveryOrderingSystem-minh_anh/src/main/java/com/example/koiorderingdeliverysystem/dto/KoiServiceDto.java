package com.example.koiorderingdeliverysystem.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class KoiServiceDto {
    @Schema(description = "Unique ID of the service", example = "101")
    private Long serviceId;

    @Schema(description = "Name of the service", example = "Koi Fish Health Check")
    private String serviceName;

    @Schema(description = "Description of the service", example = "This service includes a comprehensive health check for Koi fish, including inspection of water quality, fish behavior, and health status.")
    private String description;

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
