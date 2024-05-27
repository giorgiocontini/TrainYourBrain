package com.tyb.tyb_backend.controller;

import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.ResultUserResponse;
import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/manage-user")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")  //protocollo e indirizzo della nostra web API
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Esito> createUser(@RequestBody @Valid User user) {
        Logger.getGlobal().info("**************** Inserimento Dati User ***************");
        // Chiama il servizio per creare un nuovo utente e ritorna la risposta
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.OK);
    }

    @PostMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultUserResponse> getUserByCriteri(@RequestBody User user) {

        Logger.getGlobal().info("**************** Recupero user ***************"+user);

        // Chiama il servizio per ottenere i dettagli dell'utente e ritorna la risposta
        return new ResponseEntity<>(userService.getUser(user), HttpStatus.OK);
    }
}
