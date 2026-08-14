package com.eventflow.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("EventFlow API Engine")
                        .version("1.0.0")
                        .description("High-Concurrency Event & Ticket Reservation Microservice Architecture")
                        .contact(new Contact()
                                .name("EventFlow Engineering Team")
                                .email("engineering@eventflow.io")));
    }
}
