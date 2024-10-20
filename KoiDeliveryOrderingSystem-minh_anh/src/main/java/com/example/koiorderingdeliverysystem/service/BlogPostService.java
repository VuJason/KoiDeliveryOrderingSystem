package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.entity.BlogPosts;
import com.example.koiorderingdeliverysystem.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogPostService {


    @Autowired
    BlogPostRepository blogPostRepository;

    public BlogPosts createBlogPost(BlogPosts blogPost) {
        return blogPostRepository.save(blogPost);
    }


    public List<BlogPosts> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }


}
