package com.example.koiorderingdeliverysystem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String role_name;
    private String description;

    @OneToMany(mappedBy = "roles" )
    private List<Users> users;

}
