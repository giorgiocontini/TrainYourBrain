package com.tyb.tyb_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Data //genera automaticamente i getter e i setter
@AllArgsConstructor //crea un costruttore
@NoArgsConstructor //crea un costruttore
public class QuizResult implements Serializable {

    @Field(name = "userId")
    private String userId;

    @Field(name = "totalScore")
    private Long totalScore;

    @Field(name = "topic")
    private String topic;

}
