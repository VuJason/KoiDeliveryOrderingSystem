package com.example.koiorderingdeliverysystem.entity;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Collection;
import java.util.List;


@Data
@Entity
public class Users implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    @NotBlank(message = "Password can not blank!")
    @Size(min = 6, message = "Password must be at    least 6 characters!")
    private String password;
    private String fullname;
    private String phone;
    private String email;
    private String address;
    private Date registration_date;



    @ManyToOne
    @JoinColumn(name = "delivery_id")
    private Deliveries deliveries;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "role_id")
    private Roles roles;

    @JsonIgnore
    @OneToMany(mappedBy = "customerId")
    List<Orders> orders;

    @OneToMany(mappedBy = "approvedBy")
    List<Orders> staffOrders;

    @OneToMany(mappedBy = "assignedTo")
    List<Orders> assignedToOrders;


    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
}

