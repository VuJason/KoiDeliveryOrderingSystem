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

    @Column(name = "roles")
    private String roles;

    @Column(name = "status")
    private boolean status;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public @Email(message = "Email not valid!") String getEmail() {
        return email;
    }

    public void setEmail(@Email(message = "Email not valid!") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Password can not blank!") @Size(min = 6, message = "Password must be at    least 6 characters!") String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(@NotBlank(message = "Password can not blank!") @Size(min = 6, message = "Password must be at    least 6 characters!") String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}

