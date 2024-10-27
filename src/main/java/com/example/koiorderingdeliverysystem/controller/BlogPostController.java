package com.example.koiorderingdeliverysystem.controller;


import com.example.koiorderingdeliverysystem.dto.BlogPostDto;
import com.example.koiorderingdeliverysystem.entity.BlogPosts;
import com.example.koiorderingdeliverysystem.service.BlogPostService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:5173")
@RequestMapping("/api/blog-post")
@SecurityRequirement(name = "api")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @PostMapping
    public ResponseEntity<BlogPosts> createBlogPost(@RequestBody BlogPostDto blogPosts) {
        BlogPosts newBlogPost = blogPostService.createBlogPost(blogPosts);
        return ResponseEntity.ok(newBlogPost);
    }


    @GetMapping
    public List<BlogPosts> getBlogPosts() {

        return blogPostService.getAllBlogPosts();
    }

    @PutMapping("{blog-post}")
    public ResponseEntity updateBlogPost(@PathVariable String blogPost) {
        return null;
    }

    @DeleteMapping("/delete/{blog-post-id}")
    public ResponseEntity deleteBlogPost(@PathVariable("blog-post-id") int blogPostId) {
        BlogPosts blogPost = blogPostService.deleteBlogPost(blogPostId);
        return ResponseEntity.ok(blogPost);
    }
}
