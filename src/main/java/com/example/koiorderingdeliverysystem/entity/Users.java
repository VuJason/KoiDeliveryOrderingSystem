package com.example.koiorderingdeliverysystem.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.ArrayList;
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
    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})", message = "Invalid phone!")
    private String phone;
    @Email(message = "Invalid Email!")
    @NotBlank(message = "Email can not blank!")
    private String email;
    @
    private String address;
    private Date registration_date;


    @ManyToOne
    @JoinColumn(name = "delivery_id")
    @JsonIgnore
    private Deliveries deliveries;

    @Enumerated(EnumType.STRING)
    private Roles roles;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    List<Orders> orders;

    @OneToMany(mappedBy = "approvedBy")
    @JsonIgnore
    List<Orders> staffOrders;

    @OneToMany(mappedBy = "assignedTo")
    @JsonIgnore
    List<Orders> assignedToOrders;

    boolean status = true;

    @OneToMany(mappedBy = "staff")
    List<BlogPosts> blogPosts;

    @OneToMany(mappedBy = "customer")
    List<FeedBack> customer_feedBacks;


    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (this.roles != null) {
            authorities.add(new SimpleGrantedAuthority(this.roles.name()));
        }
        return authorities;
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

