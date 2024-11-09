package com.example.koiorderingdeliverysystem.service;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.List;
import java.util.Map;

@Service
public class DistanceService {

    @Value("${gomaps.api.key}")
    private String apiKey;

    @Value("${gomaps.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public DistanceService() {
        this.restTemplate = new RestTemplate();
    }

    public String getDistance(String origin, String destination) {

        String url = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("origins", origin)
                .queryParam("destinations", destination)
                .queryParam("key", apiKey)
                .build()
                .toString();

        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            Map<String, Object> body = response.getBody();

            if (body != null && body.containsKey("rows")) {
                List<Map<String, Object>> rows = (List<Map<String, Object>>) body.get("rows");
                if (!rows.isEmpty()) {
                    List<Map<String, Object>> elements = (List<Map<String, Object>>) rows.get(0).get("elements");
                    if (!elements.isEmpty()) {
                        Map<String, Object> distance = (Map<String, Object>) elements.get(0).get("distance");
                        if (distance != null) {

                            return String.valueOf(distance.get("value"));
                        }
                    }
                }
            }
            return "Cannot calculate distance";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}