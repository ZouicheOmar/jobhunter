package com.jobhunter.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.boot.actuate.web.exchanges.InMemoryHttpExchangeRepository;
import org.springframework.context.annotation.Bean;

@Configuration
public class HttpTraceActuatorConfiguration {
    @Bean
    public InMemoryHttpExchangeRepository createTraceRepository() {
        return new InMemoryHttpExchangeRepository();
    }
}
