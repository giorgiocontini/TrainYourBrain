package com.tyb.tyb_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.ArrayList;

@Document(collection = "questions")
@Data //genera automaticamente i getter e i setter
@AllArgsConstructor //crea un costruttore
@NoArgsConstructor //crea un costruttore
public class Question implements Serializable {

    @Id
    private String Id;

    @Field(name = "question")
    private String question;

    @Field(name = "answers")
    private ArrayList<Answer> answers;

}