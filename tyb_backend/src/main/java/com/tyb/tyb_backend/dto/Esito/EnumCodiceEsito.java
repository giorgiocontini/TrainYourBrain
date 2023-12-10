package com.tyb.tyb_backend.dto.Esito;

import lombok.Getter;

@Getter
public enum EnumCodiceEsito {
    OK("OK"),
    KO("KO");

    // Metodo per ottenere il nome
    private final String descrizione;

    // Costruttore
    EnumCodiceEsito(String descrizione) {
        this.descrizione = descrizione;
    }

}
