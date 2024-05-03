package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.EnumCodiceEsito;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.QuizDataResponse;
import com.tyb.tyb_backend.dto.ResultQuizResponse;
import com.tyb.tyb_backend.exception.TrainYourBrainException;
import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.model.QuizResult;
import com.tyb.tyb_backend.repository.QuizRepository;
import com.tyb.tyb_backend.repository.QuizResultsRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;


@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    QuizRepository quizRepository;
    @Autowired
    QuizResultsRepository quizResultsRepository;



    private static Supplier<TrainYourBrainException> createCustomException(String message) {
        return () -> new TrainYourBrainException(message);
    }

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
    public ResultQuizResponse getQuestionForATopic(String topic) {
        return new ResultQuizResponse(new Esito(EnumCodiceEsito.OK),
                quizRepository.findAllByTopic(topic).stream().map(question -> {
                    question.getAnswers().forEach(answer -> answer.setIsCorrect(null));
                    return question;
                }).collect(Collectors.toList()));
    }

    /**
     * @param questionId
     * @param answerIndex
     * @return
     */
    @Override
    public Boolean checkAnswer(String questionId, Integer answerIndex) {
        ObjectId id = new ObjectId(questionId);
        Optional<Question> question = quizRepository.findById(id);
        if (question.isPresent()) {
            return question.get().getAnswers().get(answerIndex).getIsCorrect();
        }
        return false;
    }

    /**
     * @param userId
     * @return
     */
    @Override
    public QuizDataResponse getResultsByUserId(String userId) {

        return new QuizDataResponse(new Esito(EnumCodiceEsito.OK),
                quizResultsRepository.findAllByUserId(userId));
    }

    /**
     * @param result
     */
    @Override
    public String saveResults(QuizResult result) {
        if (result != null) {
            quizResultsRepository.insert(result);
            return "Quiz correttamente salvato";
        }
        return "Inserire i dati obbligatori";
    }

}
