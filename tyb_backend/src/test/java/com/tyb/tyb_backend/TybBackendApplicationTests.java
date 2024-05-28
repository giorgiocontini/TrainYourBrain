package com.tyb.tyb_backend;

import com.tyb.tyb_backend.controller.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest
class TybBackendApplicationTests {

	WebTestClient testClient;

	private void initTestController(){
		testClient = WebTestClient.bindToController(
						new UserController())
				.build();

	}

	@Test
	void contextLoads() {

		this.initTestController();
		//Unit test con Web-flux
		//in questo metodo possiamo controllare la risposta ottenuta dal nostro endpoint
		testClient.get().uri("/api/manage-user")
				.exchange()
				.expectStatus().isOk()
				.expectBody()
				.jsonPath("$").isNotEmpty()
				.jsonPath("$").isEqualTo("Sono il primo controller!");
	}

	@Test
	void test2(){
		this.initTestController();
		//Unit test con Web-flux
		//in questo metodo possiamo controllare la risposta ottenuta dal nostro endpoint
		testClient.get().uri("/api/manage-user/Giorgio")
				.exchange()
				.expectStatus().isOk()
				.expectBody()
				.jsonPath("$").isNotEmpty();
	}


}
