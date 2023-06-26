package com.tyb.tyb_backend.controller.rest;

import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/manageData")
@CrossOrigin("http://localhost:3000")  //protocollo e indirizzo della nostra web API
public class DataController {

    //utilizza l'endpoint di base del controller
    @GetMapping
    public String getData(){
        return ("Sono il primo controller!");
    }

    //Metodo con passaggio di parametri
    @RequestMapping(value = "/{nome}", method = RequestMethod.GET, produces = "application/json")
    public String getData2(@PathVariable("nome") String nome){

        if(Objects.equals(nome, "Giorgio")){
            throw new RuntimeException("Utente non abilitato");
        }
        return (String.format("Saluti %s, sono il tuo primo webService rest", nome));
    }


}