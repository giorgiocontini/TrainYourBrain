package com.tyb.tyb_backend.dto;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
@Getter
@Setter
public class CriteriRicercaUser implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    @NotNull(message = "username non può essere null")
    private String username;

    private String name;

    private String surname;

    private String role;

    @NotNull(message = "password non può essere null")
    private String password;

    public CriteriRicercaUser() {
        username = "";
        password = "";
    }
}
