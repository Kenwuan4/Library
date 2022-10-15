package com.javeriana.gateway.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;


@Component
public class AuthGatewayFilterFactory extends
        AbstractGatewayFilterFactory<AuthGatewayFilterFactory.Config> {

    private final WebClient.Builder webClientBuilder;

    @Autowired
    private RestTemplate restTemplate;

    public AuthGatewayFilterFactory(WebClient.Builder webClientBuilder,RestTemplate restTemplate) {
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
        this.restTemplate = restTemplate;
    }

    private static class ErrorResponse {
        private String message;
        private int errorCode;

        public String getMessage() {
            return message;
        }
    }

    private boolean isAuthorizationValid(String authorizationHeader) throws URISyntaxException {
        URI uri = new URI("http://localhost:8080/authAPI/validateToken");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Authorization", authorizationHeader);
        HttpEntity<String> jwtEntity = new HttpEntity<String>(headers);
        // Use Token to get Response
        ResponseEntity<String> helloResponse = restTemplate.exchange(uri, HttpMethod.GET, jwtEntity,
                String.class);
        if(helloResponse.getStatusCode().equals(HttpStatus.OK))
            return true;
        else
            return false;
    }



    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus)  {

        ServerHttpResponse response = exchange.getResponse();

        response.setStatusCode(httpStatus);

        return response.setComplete();

    }

    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {

            ServerHttpRequest request = exchange.getRequest();

            if (!request.getHeaders().containsKey("Authorization")) {
                return this.onError(exchange, "No Authorization header", HttpStatus.UNAUTHORIZED);
            }
            else if(request.getPath().toString().contains("validateToken")){
                return chain.filter(exchange);
            }
            else {

                String authorizationHeader = request.getHeaders().get("Authorization").get(0);
                String[] parts = authorizationHeader.split(" ");
                System.out.println(parts[1]);

                try {
                    if (!this.isAuthorizationValid(authorizationHeader)) {
                        return this.onError(exchange, "Invalid Authorization header", HttpStatus.UNAUTHORIZED);
                    }
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }

                ServerHttpRequest modifiedRequest = exchange.getRequest().mutate().build();


                return chain.filter(exchange.mutate().request(modifiedRequest).build());
            }
        };

    }

    public static class Config {

        public Config() {
            // This class is for put the configuration properties
        }
    }
}