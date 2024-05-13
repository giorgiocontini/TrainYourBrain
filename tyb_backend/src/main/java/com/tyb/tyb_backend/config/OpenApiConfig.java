package com.tyb.tyb_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

import java.util.List;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI myOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8080");
        devServer.setDescription("Servizi per la piattaforma di VideoOnDemand");
        Contact contact = new Contact();
        contact.setEmail("vincenzoaffatato929@gmail.com");
        contact.setName("Vincenzo");
        contact.setUrl("https://localhost:8080/demo");
        License mitLicense = new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");
        Info info = new Info()
                .title("Project videOnDemand")
                .version("1.0")
                .contact(contact)
                .description("Piattaforma di videoOnDemand").termsOfService("https://www.affvinc.com/terms")
                .license(mitLicense);
        return new OpenAPI().info(info).servers(List.of(devServer));
    }
}
