package com.tyb.tyb_backend.model;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Inserire l'username")
    private String username;

    @Field(name = "name")
    private String name;

    @Field(name = "surname")
    private String surname;

    @Field(name = "role")
    private String role;

    @Field(name = "password")
    @NotBlank(message = "Inserire la password")
    private String password;

}