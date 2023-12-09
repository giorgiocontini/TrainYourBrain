package com.tyb.tyb_backend.model;

import com.tyb.tyb_backend.constant.UserRoleEnum;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Document(collection = "user") //Nome del documento sul db
@Data //genera automaticamente i getter e i setter
@AllArgsConstructor //crea un costruttore
@NoArgsConstructor //crea un costruttore
public class User implements Serializable {

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
    @NotNull(message = "Il ruolo è obbligatorio")
    private UserRoleEnum role;

    @Field(name = "email")
    private String email;

    @Field(name = "password")
    @NotNull(message = "Inserire la password")
    private String password;


    public User(@NotNull String username, String name, String surname, @NotNull UserRoleEnum role, String email, @NotNull String password) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.email = email;
        this.password = password;
    }


}
