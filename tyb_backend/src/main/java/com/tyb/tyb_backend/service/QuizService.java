package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.QuizDataResponse;
import com.tyb.tyb_backend.dto.ResultQuizResponse;
import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.model.QuizResult;


public interface QuizService {

    String createQuiz(Question question);

    ResultQuizResponse getQuestionForATopic(String topic);

    Boolean checkAnswer(String questionId, Integer answerIndex);

    QuizDataResponse getResultsByUserId(String userId);

    String saveResults(QuizResult result);
}
