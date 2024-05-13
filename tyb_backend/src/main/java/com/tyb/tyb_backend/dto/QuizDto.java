package com.tyb.tyb_backend.dto;

import com.tyb.tyb_backend.model.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuizDto {

    private List<Question> questions;
    private String topic;
    private String topicDescription;
    private byte[] image;


}
