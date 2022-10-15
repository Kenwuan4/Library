package com.javeriana.gateway.filter;

import com.javeriana.gateway.service.CallerService;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;


@Component
public class AuthGatewayFilterFactory extends
        AbstractGatewayFilterFactory<AuthGatewayFilterFactory.Config> {

    private final WebClient.Builder webClientBuilder;

    private final CallerService callerService;

    public AuthGatewayFilterFactory(WebClient.Builder webClientBuilder, CallerService callerService) {
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
        this.callerService = callerService;
    }


    private boolean isAuthorizationValid(String authorizationToken) throws URISyntaxException {
        return callerService.callAuthValidateToken(authorizationToken);
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

            if (!request.getHeaders().containsKey("Authorization") && request.getMethod().equals(HttpMethod.GET) && request.getPath().toString().contains("bookAPI")) {
                return chain.filter(exchange);
            }
            else if (!request.getHeaders().containsKey("Authorization")) {
                return this.onError(exchange, "No Authorization header", HttpStatus.UNAUTHORIZED);
            }
            else if(request.getPath().toString().contains("validateToken")){
                return chain.filter(exchange);
            }
            else {

                String authorizationHeader = request.getHeaders().get("Authorization").get(0);

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