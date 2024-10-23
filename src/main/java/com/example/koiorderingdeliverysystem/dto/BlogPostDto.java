package com.example.koiorderingdeliverysystem.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class BlogPostDto {
    @Schema(description = "Title of the blog post", example = "How to Care for Koi Fish")
    private String title;

    @Schema(description = "Content of the blog post", example = "This blog post discusses the proper care for Koi fish, including feeding habits, water quality, and tank size.")
    private String content;

}
