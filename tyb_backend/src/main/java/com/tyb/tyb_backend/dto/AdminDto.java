package com.tyb.tyb_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDto {
    private String email;
    private String nominante;
    private String dataNomina;
    private String username;
}
