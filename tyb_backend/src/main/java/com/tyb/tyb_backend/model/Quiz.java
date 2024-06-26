package com.tyb.tyb_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.List;

@Data //genera automaticamente i getter e i setter
@AllArgsConstructor //crea un costruttore
@NoArgsConstructor //crea un costruttore
public class Quiz implements Serializable {

    @Id
    private String id;

    @Field(name = "questions")
    private List<Question> questions;

    @Field(name = "topic")
    private String topic;

    @Field(name = "topicDescription")
    private String topicDescription;

    @Field(name = "imageFile")
    private String imageFile;

    @Field(name = "isHidden")
    private Boolean isHidden;

    @Field(name = "imagesQuiz")
    private Boolean imagesQuiz;

}
