package com.example.koiorderingdeliverysystem.repository;

import com.example.koiorderingdeliverysystem.dto.FeedBackResponse;
import com.example.koiorderingdeliverysystem.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeedBackRepository extends JpaRepository<FeedBack, Integer> {

    @Query("SELECT new com.example.koiorderingdeliverysystem.dto.FeedBackResponse(f.id, f.content, f.rating, u.username)" +
            "FROM FeedBack f JOIN Users u on f.customer.id = u.id")
    List<FeedBackResponse> findFeedBackByCustomerId(int id);

}
