package com.tyb.tyb_backend.controller.rest;

import com.tyb.tyb_backend.dto.DocumentRequest;
import com.tyb.tyb_backend.dto.Esito.EnumCodiceEsito;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.QuizDataResponse;
import com.tyb.tyb_backend.dto.ResultQuizResponse;
import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.model.Quiz;
import com.tyb.tyb_backend.model.QuizResult;
import com.tyb.tyb_backend.service.DocService;
import com.tyb.tyb_backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;


@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")  //protocollo e indirizzo della nostra web API
public class QuizController {


    @Autowired
    QuizService quizService;

    @Autowired
    DocService docService;

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Esito> createQuiz( @ModelAttribute DocumentRequest documentRequest) {
        Logger.getGlobal().info("**************** Inserimento Dati User ***************");

        try {
            Quiz document = new Quiz();
            document.setTopic(documentRequest.getTopic());
            document.setTopicDescription(documentRequest.getTopicDescription());
            document.setQuestions(documentRequest.getQuestions());
            docService.saveDocument(document, documentRequest.getFile());
            return new ResponseEntity<>(quizService.createQuiz(document), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(new Esito(EnumCodiceEsito.KO, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{topic}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultQuizResponse> getQuestionForTopic(@PathVariable String topic) {
        Logger.getGlobal().info("**************** Recupero domande per un topic ***************");
        return new ResponseEntity<>(quizService.getQuizByTopic(topic), HttpStatus.OK);
    }

    @GetMapping(value = "/{quizId}/{questionId}/{answerId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> checkAnswer(@PathVariable String quizId, @PathVariable Integer questionId,
                                               @PathVariable Integer answerId) {
        Logger.getGlobal().info("**************** Verifico risposta ***************");
        return new ResponseEntity<>(quizService.checkAnswer(quizId, questionId, answerId), HttpStatus.OK);
    }

    @GetMapping(value = "/results/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<QuizDataResponse> getResultsByUserId(@PathVariable String userId) {
        Logger.getGlobal().info("**************** Recupero i risultati relativi ad un utente ***************");
        return new ResponseEntity<>(quizService.getResultsByUserId(userId), HttpStatus.OK);
    }

    @PostMapping(value = "/saveQuiz", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Esito> saveUserResult(@RequestBody QuizResult result) {
        Logger.getGlobal().info("**************** Salvo il quiz associandolo all'utente ***************");
        return new ResponseEntity<>(quizService.saveResults(result), HttpStatus.OK);
    }

}
