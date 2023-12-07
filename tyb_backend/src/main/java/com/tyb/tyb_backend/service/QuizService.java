package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.model.Question;

import java.util.List;


public interface QuizService {

    String createQuiz(Question question);

    List<Question> getQuestionForATopic(String topic);

}
