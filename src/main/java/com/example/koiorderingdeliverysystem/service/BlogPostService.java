package com.example.koiorderingdeliverysystem.service;


import com.example.koiorderingdeliverysystem.dto.BlogPostDto;
import com.example.koiorderingdeliverysystem.entity.BlogPosts;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.exception.EntityNotFoundException;
import com.example.koiorderingdeliverysystem.repository.BlogPostRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BlogPostService {


    @Autowired
    BlogPostRepository blogPostRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    UserService userService;

    public BlogPosts createBlogPost(BlogPostDto blogPost) {
        Users staff = userService.getCurrentAccount();

        BlogPosts blogPosts = modelMapper.map(blogPost, BlogPosts.class);
        blogPosts.setStaff(staff);
        blogPosts.setPublish_date(new Date());
        return blogPostRepository.save(blogPosts);
    }


    public List<BlogPosts> getAllBlogPosts() {

        return blogPostRepository.findBlogPostsByStatusTrue();
    }

    public BlogPosts deleteBlogPost(int id) {
        BlogPosts blogPosts = getBlogPostById(id);
        blogPosts.setStatus(false);
        return blogPostRepository.save(blogPosts);
    }

    public BlogPosts getBlogPostById(int id) {
        BlogPosts blogPosts = blogPostRepository.findBlogPostsById(id);
        if(blogPosts == null) throw new EntityNotFoundException("Blog Post Not Found!");
        return blogPosts;
    }

}
