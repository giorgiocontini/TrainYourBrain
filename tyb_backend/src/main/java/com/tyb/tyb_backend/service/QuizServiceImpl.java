package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    QuizRepository quizRepository;


    @Override
    public String createQuiz(Question question) {
        if (question != null) {
            quizRepository.insert(question);
            return "Quiz correttamente creato";
        }
        return "Inserire i dati obbligatori";
    }

    /**
     * @param topic
     * @return
     */
    @Override
    public List<Question> getQuestionForATopic(String topic) {
        return quizRepository.findAllByTopic(topic);
    }


}
