package com.javeriana.gateway.filters;

import com.javeriana.gateway.service.AuthService;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    private final WebClient.Builder webClientBuilder;
    private final AuthService service;

    public AuthFilter(WebClient.Builder webClientBuilder, AuthService service) {
        this.webClientBuilder = webClientBuilder;
        this.service = service;
    }
    @Override
    public GatewayFilter apply(AuthFilter.Config config) {
        return ((exchange, chain) -> {
            if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                throw new RuntimeException("Missing auth information");
            }
            else{
                ResponseEntity<String> response = service.validateToken(exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0));
                if(response.getStatusCodeValue() == 404)
                    throw new RuntimeException("Missing auth information");
                else

            }
        })
    }

    public static class Config{

    }
}
