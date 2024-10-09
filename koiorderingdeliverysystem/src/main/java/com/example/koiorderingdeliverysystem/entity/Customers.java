package com.example.koiorderingdeliverysystem.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "customer")
public class Customers {

    @Id
    private String customerId;

    private String customerName;
    @Email(message = "Email not valid!")
    private String email;

    private String phoneNumber;
    private String address;
    private boolean status;
}
