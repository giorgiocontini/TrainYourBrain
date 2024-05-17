package com.tyb.tyb_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.ArrayList;

@Data //genera automaticamente i getter e i setter
@AllArgsConstructor //crea un costruttore
@NoArgsConstructor //crea un costruttore
public class Question implements Serializable {

    @Id
    private String id;

    @Field(name = "description")
    private String description;

    @Field(name = "answers")
    private ArrayList<Answer> answers;

}
