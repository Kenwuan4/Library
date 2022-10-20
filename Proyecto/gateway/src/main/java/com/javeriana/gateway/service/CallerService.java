package com.javeriana.gateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * Este Service es usado por el gateway para comunicarse con otros servicios,
 * en este caso llama al microservicio de autenticación.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Service
public class CallerService {

    @Autowired
    private RestTemplate restTemplate;



    /**
     * En este método se utiliza solicitar al microservicio de autenticación que valide un token.
     *@param  token Corresponde al token a validar por el microservicio de autenticación.
     * @return boolean retorna un flag que indica si el token fue validado por el microservicio o no.
     */
    public boolean callAuthValidateToken(String token) throws URISyntaxException {
        //set HTTP headers and URI
        URI uri = new URI("http://localhost:8085/authAPI/validateToken");
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
