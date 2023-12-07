package com.tyb.tyb_backend.controller.rest;

import com.tyb.tyb_backend.dto.CriteriRicercaUser;
import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.logging.Logger;

import java.util.Objects;



@RestController
@RequestMapping("/api/manage-user")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")  //protocollo e indirizzo della nostra web API
public class UserController {


    @Autowired
    UserService userService;

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public String createUser(@RequestBody User user){
        Logger.getGlobal().info("**************** Inserimento Dati User ***************");
       return  userService.createUser(user);
    }


    //Metodo con passaggio di parametri
    @RequestMapping(value = "/{nome}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getData2(@PathVariable("nome") String nome){

        if(Objects.equals(nome, "Giorgio")){
            throw new RuntimeException("Utente non abilitato");
        }
        return (String.format("Saluti %s, sono il tuo primo webService rest", nome));
    }



    @PostMapping(value = "/user",  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getUserFromId(@RequestBody @Valid CriteriRicercaUser criteri){
        try{
            User resp = userService.getUser(criteri);
            if(resp!=null){
                return new ResponseEntity<>(resp, HttpStatus.OK );
            }
        }catch (Exception e){
            Logger.getGlobal().info("Utente non trovato");
        }

        return null;
    }


}
