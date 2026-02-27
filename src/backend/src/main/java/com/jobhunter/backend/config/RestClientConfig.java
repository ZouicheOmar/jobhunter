package com.jobhunter.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.client.RestClient;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class RestClientConfig {

    // @Autowired
    // private Environment environment;

    @Value("${app-services.scrap-service-url}")
    private String serviceUrl;

    @Bean
    public RestClient combinedServiceClient() {
        // String serviceUrl = environment.getProperty("app-services.scrap-service-url");
        log.info("==============================");
        log.info("combined services url : " + serviceUrl);
        log.info("==============================");
        return RestClient.builder()
                .baseUrl(serviceUrl)
                .defaultHeader("ContentTtype", "application/json")
                .build();
    }
}
