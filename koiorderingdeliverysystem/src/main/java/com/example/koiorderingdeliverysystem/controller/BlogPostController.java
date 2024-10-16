package com.example.koiorderingdeliverysystem.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin("*")
public class BlogPostController {

    @PostMapping
    public ResponseEntity createPost() {
        return null;
    }

    @PutMapping("{staffId}")
    public ResponseEntity updatePost(@PathVariable("staffId") long staffId) {
        return null;
    }

    @DeleteMapping("/delete/{staffId}")
    public ResponseEntity deletePost(@PathVariable("staffId") long staffId) {
        return null;
    }


}
