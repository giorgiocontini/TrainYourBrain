package com.tyb.tyb_backend.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@Document(collection = "questions")
public class Question {

    @Id
    private Integer Id;

    @Field(name = "question")
    private String question;

    @Field(name = "responses")
    private ArrayList<Answer> responses;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public ArrayList<Answer> getResponses() {
        return responses;
    }

    public void setResponses(ArrayList<Answer> responses) {
        this.responses = responses;
    }
}