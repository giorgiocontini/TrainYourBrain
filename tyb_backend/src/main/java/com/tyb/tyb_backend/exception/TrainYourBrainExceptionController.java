package com.tyb.tyb_backend.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Gestisce le eccezioni custom dei vari servizi di tyb.
 */
@RestControllerAdvice
public class TrainYourBrainExceptionController {


    @ExceptionHandler(value = {TrainYourBrainException.class})
    public ResponseEntity<String> tybExceptionHandler(TrainYourBrainException tybException) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);

        Logger.getGlobal().log(Level.SEVERE, tybException.getMessage(), tybException);
        return new ResponseEntity<>(tybException.getMessage(), headers, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {RuntimeException.class})
    public ResponseEntity<String> runtimeExceptionHandler(RuntimeException exception) {

        //TODO definire come gestire le eccezioni per il 400
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);

        Logger.getGlobal().log(Level.SEVERE, exception.getMessage(), exception);
        return new ResponseEntity<>(exception.getMessage(), headers, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
