package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.EnumCodiceEsito;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.QuizDataResponse;
import com.tyb.tyb_backend.dto.ResultQuizResponse;
import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.model.QuizResult;
import com.tyb.tyb_backend.repository.QuizRepository;
import com.tyb.tyb_backend.repository.QuizResultsRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    QuizRepository quizRepository;
    @Autowired
    QuizResultsRepository quizResultsRepository;
    //@Autowired
    //TopicRepository topicRepository;


    @Override
    public Esito createQuiz(List<Question> questions) {
        if (questions != null && !questions.isEmpty()) {
            quizRepository.insert(questions);
            return new Esito(EnumCodiceEsito.OK, "Quiz correttamente creato");
        }
        return new Esito(EnumCodiceEsito.KO, "Si sono verificati degli errori, si prega di riporvare");
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

}
