package com.example.koi.entity;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Account {
    int id;
    @Email(message="Email not valid!")
    String email;
    @Pattern(regexp = "(84|0[3|5|7|8|9]) + (\\d{8})",message = "Phone invalid!" )
    String phone;
    Date createAt;
    @NotBlank(message = "Password not blank!")
    @Size(min = 6, message = "Password must be at least 6 characters!")
    String password;
}
