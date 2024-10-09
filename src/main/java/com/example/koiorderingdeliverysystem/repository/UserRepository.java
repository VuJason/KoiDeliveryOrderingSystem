package com.example.koiorderingdeliverysystem.repository;
import com.example.koiorderingdeliverysystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
    User findByEmail(String email);
}
