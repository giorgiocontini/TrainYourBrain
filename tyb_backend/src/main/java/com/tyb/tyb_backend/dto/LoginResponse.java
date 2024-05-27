package com.tyb.tyb_backend.dto;

import com.tyb.tyb_backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private User userData;
    private String token;

    // Getters and Setters
}
