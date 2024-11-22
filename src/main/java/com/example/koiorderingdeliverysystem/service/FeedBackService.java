package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.dto.request.FeedBackRequest;
import com.example.koiorderingdeliverysystem.dto.response.FeedBackResponse;
import com.example.koiorderingdeliverysystem.dto.response.CreatedFeedbackResponse;
import com.example.koiorderingdeliverysystem.entity.FeedBack;
import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.repository.FeedBackRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedBackService {

    @Autowired
    FeedBackRepository feedBackRepository;

    @Autowired
    UserService userService;
    @Autowired
    private ModelMapper modelMapper;

    public CreatedFeedbackResponse createFeedBack(FeedBackRequest feedBackRequest) {
        Users currentUser =userService.getCurrentAccount();

        FeedBack feedBack = new FeedBack();
        feedBack.setId(currentUser.getId());
        feedBack.setContent(feedBackRequest.getContent());
        feedBack.setRating(feedBackRequest.getRating());
        feedBack.setCustomer(currentUser);

        feedBackRepository.save(feedBack);
        return modelMapper.map(feedBack, CreatedFeedbackResponse.class);
    }

    public List<FeedBackResponse> getFeedback() {
        return feedBackRepository.findFeedBackByCustomerId(userService.getCurrentAccount().getId());
    }
}