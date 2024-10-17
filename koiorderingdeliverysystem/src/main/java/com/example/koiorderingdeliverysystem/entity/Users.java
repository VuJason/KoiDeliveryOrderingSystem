package com.example.koiorderingdeliverysystem.entity;




import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="name")
    private String name;
    @Column(name = "email")
    @Email(message = "Email not valid!")
    private String email;

    @Column(name = "password_hash")
    @NotBlank(message = "Password can not blank!")
    @Size(min = 6, message = "Password must be at    least 6 characters!")
    private String passwordHash;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "status")
    private boolean status;


}

