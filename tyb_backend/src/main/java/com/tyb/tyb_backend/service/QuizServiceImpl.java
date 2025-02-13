package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.EnumCodiceEsito;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.QuizDataResponse;
import com.tyb.tyb_backend.dto.ResultQuizResponse;
import com.tyb.tyb_backend.model.Answer;
import com.tyb.tyb_backend.model.Quiz;
import com.tyb.tyb_backend.model.QuizResult;
import com.tyb.tyb_backend.repository.QuizRepository;
import com.tyb.tyb_backend.repository.QuizResultsRepository;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


@Service
public class QuizServiceImpl implements QuizService {


    private final QuizRepository quizRepository;
    private final QuizResultsRepository quizResultsRepository;


    public QuizServiceImpl(QuizRepository quizRepository, QuizResultsRepository quizResultsRepository) {
        this.quizRepository = quizRepository;
        this.quizResultsRepository = quizResultsRepository;
    }


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
            quizList.forEach(quiz ->
                    quiz.getQuestions().forEach(question ->
                            question.getAnswers().forEach(answer ->
                                    answer.setIsCorrect(null)
                            )
                    )
            );
        } else {
            Quiz quiz = quizRepository.findQuizByTopic(topic);
            if (quiz != null) {
                quiz.getQuestions().forEach(question -> {
                    List<Answer> shuffledAnswers = shuffleList(question.getAnswers());
                    shuffledAnswers.forEach(answer -> answer.setIsCorrect(null));
                    question.setAnswers((ArrayList<Answer>) shuffledAnswers);
                });
                quiz.setQuestions(shuffleList(quiz.getQuestions()));
                quizList.add(quiz);
            }
        }

        return new ResultQuizResponse(new Esito(EnumCodiceEsito.OK),quizList);
    }

    public static <T> List<T> shuffleList(List<T> list) {
        Collections.shuffle(list);
        return list;
    }

    /**
     * @param questionId
     * @param answerIndex
     * @return
     */
    @Override
    public Boolean checkAnswer(String quizId, String questionId, String answerIndex) {
        ObjectId id = new ObjectId(quizId);
        Optional<Quiz> quizOptional = quizRepository.findById(id);

        return quizOptional.map(quiz -> quiz.getQuestions().stream()
                        .filter(question -> question.getId().equals(questionId))
                        .findFirst()
                        .map(question -> question.getAnswers().stream()
                                .filter(answer -> answer.getDescription().equals(answerIndex))).get().findFirst().get().getIsCorrect()).get();
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

        quizResultsRepository.insert(result);
        return new Esito(EnumCodiceEsito.OK, "Quiz correttamente salvato");
    }
}

    @Document
    @Data
    class DocumentFile {
        private String name;
        private byte[] content;
        private String contentType;

        // getters e setters
    }

