package com.example.koiorderingdeliverysystem.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GoMapsService {

    @Value("${gomaps.api.key}")
    private String apiKey;

    @Value("${gomaps.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public GoMapsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getDistance(String origin, String destination) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/distance")
                .queryParam("origin", origin)
                .queryParam("destination", destination)
                .queryParam("key", apiKey)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }
}

