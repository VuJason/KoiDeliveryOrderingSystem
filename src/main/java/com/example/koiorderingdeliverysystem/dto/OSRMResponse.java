package com.example.koiorderingdeliverysystem.dto;

public class OSRMResponse {
    private Route[] routes;

    public Route[] getRoutes() { return routes; }

    public static class Route {
        private double distance;

        public double getDistance() { return distance; }
    }
}
