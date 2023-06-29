package com.tyb.tyb_backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "user")
public class User {

//@Field serve per mappare campi con nomi diversi tra db e java


    @Field(name = "username")
    private String username;

    @Field(name = "name")
    private String name;

    @Field(name = "surname")
    private String surname;

    @Field(name = "role")
    private String role;


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

    //costruttore per la persistence
    @PersistenceCreator
    public User(Integer id, String username, String name, String surname, String role) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.role = role;
    }
}