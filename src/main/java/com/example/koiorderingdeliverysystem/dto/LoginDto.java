package com.example.koiorderingdeliverysystem.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

    @Email(message = "Email not valid!")
    private String email;
    @NotBlank(message = "Password can not blank!")
    private String password;

    public @NotBlank(message = "Password can not blank!") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password can not blank!") String password) {
        this.password = password;
    }

    public @Email(message = "Email not valid!") String getEmail() {
        return email;
    }

    public void setEmail(@Email(message = "Email not valid!") String email) {
        this.email = email;
    }
}
