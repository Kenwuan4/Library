package com.javeriana.gateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class AuthService {
    @Autowired
    private RestTemplate restTemplate;

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }


    public ResponseEntity<String> validateToken(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity <String> entity = new HttpEntity<String>(headers);
        ResponseEntity<String> response = restTemplate.getForObject(restTemplate.exchange(" http://localhost:8098/validate", HttpMethod.GET, entity, String.class);
        return response;
    }

}
