package com.example.koiorderingdeliverysystem.repository;

import com.example.koiorderingdeliverysystem.entity.BlogPosts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogPostRepository extends JpaRepository<BlogPosts, Integer> {
    BlogPosts findBlogPostsById(int id);
    List<BlogPosts> findBlogPostsByStatusTrue();
}
