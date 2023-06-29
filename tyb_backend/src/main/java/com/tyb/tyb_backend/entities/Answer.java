package com.tyb.tyb_backend.entities;

import org.springframework.data.mongodb.core.mapping.Field;


public class Answer {

    @Field(name = "answer")
    private String answer;

    @Field(name = "isCorrect")
    private Boolean isCorrect;

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Boolean getCorrect() {
        return isCorrect;
    }

    public void setCorrect(Boolean correct) {
        isCorrect = correct;
    }
}