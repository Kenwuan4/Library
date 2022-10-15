package com.javeriana.gateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

@Service
public class CallerService {

    @Autowired
    private RestTemplate restTemplate;


    public boolean callAuthValidateToken(String token) throws URISyntaxException {
        //set HTTP headers and URI
        URI uri = new URI("http://localhost:8080/authAPI/validateToken");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", token);
        HttpEntity<String> jwtEntity = new HttpEntity<String>(headers);

        // Use token and get response
        ResponseEntity<String> validTokenResponse = restTemplate.exchange(uri, HttpMethod.GET, jwtEntity,
                String.class);

        if(validTokenResponse.getStatusCode().equals(HttpStatus.OK))
            return true;
        else
            return false;
    }
}
