package com.tyb.tyb_backend.controller.rest;

import com.tyb.tyb_backend.dto.CriteriRicercaUser;
import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.service.QuizService;
import com.tyb.tyb_backend.service.QuizServiceImpl;
import com.tyb.tyb_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.logging.Logger;


@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")  //protocollo e indirizzo della nostra web API
public class QuizController {


    @Autowired
    QuizService quizService;

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public String createQuiz(@RequestBody Question question){
        Logger.getGlobal().info("**************** Inserimento Dati User ***************");
       return  quizService.createQuiz(question);
    }

    @GetMapping(value = "/get-questions/{topic}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Question> getQuestionForTopic(@PathVariable String topic){
        Logger.getGlobal().info("**************** Recupero domande per un topic ***************");
        return quizService.getQuestionForATopic(topic);
    }


}
