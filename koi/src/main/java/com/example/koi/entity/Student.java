package com.example.koi.entity;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @NotBlank(message = "Name can not blank!")
    private String name;

    @NotBlank(message = "studentCode cannot blank!")
    @Pattern(regexp = "SE\\d{6}")
    private String studentCode;
    private float score;
}
