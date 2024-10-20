package com.example.koiorderingdeliverysystem.repository;
import com.example.koiorderingdeliverysystem.entity.Roles;
import com.example.koiorderingdeliverysystem.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<Users, Integer> {
    //    User findByUsername(String username);
    Users findUsersByEmail(String email);
    Users findUsersById(int id);
    public List<Users> findByRoles(Roles roles);
}