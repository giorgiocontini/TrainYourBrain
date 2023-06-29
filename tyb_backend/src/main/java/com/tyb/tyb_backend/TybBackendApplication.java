package com.tyb.tyb_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Component;

@SpringBootApplication
@EnableMongoRepositories("com.tyb.tyb_backend.repositories") //require to use mongoDB
public class TybBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TybBackendApplication.class, args);
	}

}