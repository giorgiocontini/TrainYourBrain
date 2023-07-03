package com.tyb.tyb_backend.dto;
import jakarta.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}