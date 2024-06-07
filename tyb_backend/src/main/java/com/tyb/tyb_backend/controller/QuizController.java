package com.tyb.tyb_backend.controller;

import com.tyb.tyb_backend.dto.AnswerRequest;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.QuizDataResponse;
import com.tyb.tyb_backend.dto.ResultQuizResponse;
import com.tyb.tyb_backend.model.Quiz;
import com.tyb.tyb_backend.model.QuizResult;
import com.tyb.tyb_backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;


@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")  //protocollo e indirizzo della nostra web API
public class QuizController {


    @Autowired
    QuizService quizService;


    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Esito> createDocument(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.createQuiz(quiz));
    }

    @GetMapping(value = "/{topic}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultQuizResponse> getQuestionForTopic(@PathVariable String topic) {
        Logger.getGlobal().info("**************** Recupero domande per un topic ***************");
        return new ResponseEntity<>(quizService.getQuizByTopic(topic), HttpStatus.OK);
    }

    @PostMapping(value = "/{quizId}/{questionId}/checkAnswer", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> checkAnswer(@PathVariable String quizId, @PathVariable String questionId,
                                               @RequestBody AnswerRequest answerObj) {
        Logger.getGlobal().info("**************** Verifico risposta ***************");
        return new ResponseEntity<>(quizService.checkAnswer(quizId, questionId, answerObj.getAnswer()), HttpStatus.OK);
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
