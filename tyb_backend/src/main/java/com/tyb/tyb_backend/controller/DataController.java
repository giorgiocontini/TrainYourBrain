package com.tyb.tyb_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/manageData")
public class DataController {

    //utilizza l'endpoint di base del controller
    @GetMapping
    public String getData(){
        return ("Sono il primo controller!");
    }
}