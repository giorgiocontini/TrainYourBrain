package com.tyb.tyb_backend.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;

@Document(collection = "user") //Nome del documento sul db
@Data //genera automaticamente i getter e i setter
@AllArgsConstructor //crea un costruttore
@NoArgsConstructor //crea un costruttore
public class User implements Serializable, UserDetails {

    @Id
    private String id;

    @Field(name = "username") //@Field serve per mappare campi con nomi diversi tra db e java
    @NotNull(message = "Inserire l'username")
    private String username;

    @Field(name = "name")
    private String name;

    @Field(name = "surname")
    private String surname;

    @Field(name = "role")
    @NotNull(message = "Inserire il ruolo")
    private String role;

    @Field(name = "email")
    private String email;

    @Field(name = "password")
    @NotNull(message = "Inserire la password")
    private String password;


    public User( String username, String name, String surname,  String role, String email,
                 String password) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.email = email;
        this.password = password;
    }


    /**
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    /**
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * @return
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
