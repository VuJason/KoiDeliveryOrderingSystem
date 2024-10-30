package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.response.NominatimResponse;
import com.example.koiorderingdeliverysystem.dto.response.OSRMResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class DistanceService {

    private final RestTemplate restTemplate;

    public DistanceService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public double calculateDistance(String startAddress, String endAddress) {
        // Lấy tọa độ từ Nominatim
        double[] startCoords = getCoordinates(startAddress);
        double[] endCoords = getCoordinates(endAddress);

        // Tính khoảng cách bằng OSRM
        return getRouteDistance(startCoords[0], startCoords[1], endCoords[0], endCoords[1]);
    }


    private double[] getCoordinates(String address) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        NominatimResponse[] response = null;
        try {
            String url = "https://nominatim.openstreetmap.org/search?q=" + address + "&format=json";
            response = restTemplate.getForObject(url, NominatimResponse[].class);
        }
        catch (RestClientException e) {
            System.out.println(e.getMessage());
        }
        // Log URL và phản hồi

        if (response != null && response.length > 0) {
            System.out.println("Longitude: " + response[0].getLon() + ", Latitude: " + response[0].getLat());
            return new double[]{Double.parseDouble(response[0].getLon()), Double.parseDouble(response[0].getLat())};
        }

        throw new RuntimeException("Could not get coordinates for address: " + address);
    }


    private double getRouteDistance(double lon1, double lat1, double lon2, double lat2) {
        String url = String.format("http://router.project-osrm.org/route/v1/driving/%s,%s;%s,%s?overview=false",
                lon1, lat1, lon2, lat2);
        OSRMResponse response = restTemplate.getForObject(url, OSRMResponse.class);
        if (response != null && response.getRoutes() != null && response.getRoutes().length > 0) {
            return response.getRoutes()[0].getDistance(); // Khoảng cách theo mét
        }
        throw new RuntimeException("Could not get route distance");
    }
}
