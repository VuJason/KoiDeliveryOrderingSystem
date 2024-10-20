package com.example.koiorderingdeliverysystem.repository;

import com.example.koiorderingdeliverysystem.entity.BlogPosts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostRepository extends JpaRepository<BlogPosts, Integer> {

}
