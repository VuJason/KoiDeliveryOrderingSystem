package com.example.koiorderingdeliverysystem.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class BlogPosts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String content;
    private Date publish_date;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    @JsonIgnore
    private Users staff;

    boolean status = true;


}
