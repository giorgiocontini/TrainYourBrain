package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.QuizDataResponse;
import com.tyb.tyb_backend.dto.ResultQuizResponse;
import com.tyb.tyb_backend.model.Quiz;
import com.tyb.tyb_backend.model.QuizResult;


public interface QuizService {

    Esito createQuiz(Quiz quiz);

    ResultQuizResponse getQuizByTopic(String topic);

    Boolean checkAnswer(String quizId, Integer questionId, Integer answerIndex);

    QuizDataResponse getResultsByUserId(String userId);

    Esito saveResults(QuizResult result);
}
