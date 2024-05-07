package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.QuizDataResponse;
import com.tyb.tyb_backend.dto.ResultQuizResponse;
import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.model.QuizResult;

import java.util.List;


public interface QuizService {

    Esito createQuiz(List<Question> questions);

    ResultQuizResponse getQuestionForATopic(String topic);

    Boolean checkAnswer(String questionId, Integer answerIndex);

    QuizDataResponse getResultsByUserId(String userId);

    Esito saveResults(QuizResult result);
}
