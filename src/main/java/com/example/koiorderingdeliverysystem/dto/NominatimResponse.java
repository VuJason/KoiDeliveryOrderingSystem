package com.example.koiorderingdeliverysystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NominatimResponse {
    @JsonProperty("lat")
    private String lat;

    @JsonProperty("lon")
    private String lon;

    public String getLat() { return lat; }
    public String getLon() { return lon; }
}