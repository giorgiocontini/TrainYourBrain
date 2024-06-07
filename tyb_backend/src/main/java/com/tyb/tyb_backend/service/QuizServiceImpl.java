package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.EnumCodiceEsito;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.QuizDataResponse;
import com.tyb.tyb_backend.dto.ResultQuizResponse;
import com.tyb.tyb_backend.model.Answer;
import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.model.Quiz;
import com.tyb.tyb_backend.model.QuizResult;
import com.tyb.tyb_backend.repository.QuizRepository;
import com.tyb.tyb_backend.repository.QuizResultsRepository;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    QuizRepository quizRepository;
    @Autowired
    QuizResultsRepository quizResultsRepository;


    @Override
    public Esito createQuiz(Quiz quiz) {

        if (quiz != null && !quiz.getQuestions().isEmpty()) {
            quiz.getQuestions().forEach(question -> {
                if (question.getId() == null) {
                    question.setId(new ObjectId().toHexString());
                }
            });
            quizRepository.insert(quiz);
            return new Esito(EnumCodiceEsito.OK, "Quiz correttamente creato");
        }
        return new Esito(EnumCodiceEsito.KO, "Si sono verificati degli errori, si prega di riporvare");
    }

    /**
     * @param topic
     * @return
     */
    @Override
    public ResultQuizResponse getQuizByTopic(String topic) {

        List<Quiz> quizList = new ArrayList<>();
        if (Objects.equals(topic, "all")) {
            quizList = quizRepository.findAll();
            quizList.forEach(quiz -> quiz.getQuestions().forEach(question ->{ question.getAnswers().forEach(answer -> answer.setIsCorrect(null));
            }
            ));
        } else {
            Quiz quiz = quizRepository.findQuizByTopic(topic);
            if (quiz != null) {
                quiz.getQuestions().forEach(question -> question.getAnswers().forEach(answer -> answer.setIsCorrect(null)));
                quizList.add(quiz);
            }
        }
        return new ResultQuizResponse(new Esito(EnumCodiceEsito.OK), quizList);

    }

    /**
     * @param questionId
     * @param answer
     */
    @Override
    public Boolean checkAnswer(String quizId, String questionId, String answer) {
        ObjectId id = new ObjectId(quizId);
        Optional<Quiz> quizOptional = quizRepository.findById(id);

        if (quizOptional.isPresent()) {
            Quiz quiz = quizOptional.get();
            List<Question> questions = quiz.getQuestions();

            return questions.stream()
                    .filter(question -> question.getId().equals(questionId))
                    .findFirst()
                    .map(question -> question.getAnswers().stream()
                            .filter(elem -> elem.getDescription().equals(answer))
                            .findFirst()
                            .map(Answer::getIsCorrect)
                            .orElse(false)) // Restituisce false se la risposta non è trovata
                    .orElse(false); // Restituisce false se la domanda non è trovata
        }

        return false; // Restituisce false se il quiz non è trovato
    }

    /**
     * @param userId
     * @return
     */
    @Override
    public QuizDataResponse getResultsByUserId(String userId) {

        if (userId.equals("all")) {
            return new QuizDataResponse(new Esito(EnumCodiceEsito.OK),
                    quizResultsRepository.findAll());
        }
        return new QuizDataResponse(new Esito(EnumCodiceEsito.OK),
                quizResultsRepository.findAllByUserId(userId));
    }

    /**
     * @param result
     */
    @Override
    public Esito saveResults(QuizResult result) {

        // Definizione del formato desiderato
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        // Formattazione della data nella stringa
        String dataFormattata = sdf.format(new Date());
        //setto la data di completamento del quiz
        result.setDate(dataFormattata);

        if (result != null) {
            quizResultsRepository.insert(result);
            return new Esito(EnumCodiceEsito.OK, "Quiz correttamente salvato");
        }
        return new Esito(EnumCodiceEsito.KO, "Si sono verificati degli errori");
    }

    @Document
    @Data
    class DocumentFile {
        private String name;
        private byte[] content;
        private String contentType;

        // getters e setters
    }

}
