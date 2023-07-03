package com.tyb.tyb_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Document
@Data //genera automaticamente i getter e i setter
@AllArgsConstructor //crea un costruttore
@NoArgsConstructor //crea un costruttore
public class Answer implements Serializable {

    //senza id perchè questa verrà utilizzata
    //all'interno di un'altra classe come
    //documento interno
    @Field(name = "answer")
    private String answer;

    @Field(name = "isCorrect")
    private Boolean isCorrect;
}