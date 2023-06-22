package com.tyb.tyb_backend;

import com.tyb.tyb_backend.controller.DataController;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest
class TybBackendApplicationTests {

	@Test
	void contextLoads() {
		WebTestClient testClient = WebTestClient.bindToController(
						new DataController())
				.build();

		//Unit test con Web-flux
		//in questo metodo possiamo controllare la risposta ottenuta dal nostro endpoint
		testClient.get().uri("/api/manageData")
				.exchange()
				.expectStatus().isOk()
				.expectBody()
				.jsonPath("$").isNotEmpty()
				.jsonPath("$").isEqualTo("Sono il primo controller!");
	}


}