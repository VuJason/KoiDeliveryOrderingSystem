package com.example.koiorderingdeliverysystem.controller;


import com.example.koiorderingdeliverysystem.entity.BlogPosts;
import com.example.koiorderingdeliverysystem.service.BlogPostService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/blog-post")
@SecurityRequirement(name = "api")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @PostMapping
    public ResponseEntity createBlogPost(@RequestBody BlogPosts blogPosts) {
//       return blogPostService.createBlogPost(blogPosts);
        return null;
    }


    @GetMapping
    public List<BlogPosts> getBlogPosts() {

        return blogPostService.getAllBlogPosts();
    }

    @PutMapping("{blog-post}")
    public ResponseEntity updateBlogPost(@PathVariable String blogPost) {
        return null;
    }

    @DeleteMapping("/delete/{blog-post}")
    public ResponseEntity deleteBlogPost(@PathVariable String blogPost) {
        return null;
    }
}
