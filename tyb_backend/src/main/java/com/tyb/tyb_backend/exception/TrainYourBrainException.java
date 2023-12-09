package com.tyb.tyb_backend.exception;

import jakarta.validation.constraints.NotNull;

public class TrainYourBrainException extends RuntimeException {

    public TrainYourBrainException(
            //@NotNull(message = "Il tipo di errore non può essere null") TrainYourBrainErrorType errorType,
            @NotNull(message = "Il message source non può essere null") String messageSource) {
        super(messageSource);
    }
}
