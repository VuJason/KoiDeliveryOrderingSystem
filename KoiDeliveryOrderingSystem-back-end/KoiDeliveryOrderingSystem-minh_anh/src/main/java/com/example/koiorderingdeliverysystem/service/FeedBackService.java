package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.entity.FeedBack;
import com.example.koiorderingdeliverysystem.repository.FeedBackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedBackService {

    @Autowired
    FeedBackRepository feedBackRepository;


    public List<FeedBack> getAll() {
        return feedBackRepository.findAll();

    }
}
