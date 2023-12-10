package com.tyb.tyb_backend.exception;

import com.tyb.tyb_backend.dto.Esito.EnumCodiceEsito;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.Esito.EsitoResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Gestisce le eccezioni custom dei vari servizi di tyb.
 */
@RestControllerAdvice
public class TrainYourBrainExceptionController extends RuntimeException{

    @ExceptionHandler(value = {TrainYourBrainException.class})
    public ResponseEntity<EsitoResponse> tybExceptionHandler(TrainYourBrainException tybException) {
        //Permette di intercettare le eccezioni custom e gestire il messaggio da inoltrare
        return new ResponseEntity<>(
                new EsitoResponse(new Esito()
                        .setCodice(EnumCodiceEsito.KO)
                        .setDescrizione(tybException.getMessage())),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
