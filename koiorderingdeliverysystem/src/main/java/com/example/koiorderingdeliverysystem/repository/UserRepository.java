package com.example.koiorderingdeliverysystem.repository;
import com.example.koiorderingdeliverysystem.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<Users, Integer> {
//    User findByUsername(String username);
    Users findByEmail(String email);
    Users findById(int id);
}
