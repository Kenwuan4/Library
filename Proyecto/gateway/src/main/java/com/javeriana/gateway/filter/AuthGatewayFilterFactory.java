package com.javeriana.gateway.filter;

import com.javeriana.gateway.service.CallerService;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * Este Component es un filtro personalizado y usado en el gateway para procesar las peticiones entrantes.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Component
@CrossOrigin("http://localhost:4200/")
public class AuthGatewayFilterFactory extends
        AbstractGatewayFilterFactory<AuthGatewayFilterFactory.Config> {

    private final WebClient.Builder webClientBuilder;

    private final CallerService callerService;

    public AuthGatewayFilterFactory(WebClient.Builder webClientBuilder, CallerService callerService) {
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
        this.callerService = callerService;
    }

    /**
     * En este método se llama al microservicio de autenticación mediante el callerService
     *@param  authorizationToken Corresponde al token a validar por el microservicio de autenticación.
     * @return boolean retorna un flag que indica si el token fue validado por el microservicio o no.
     */
    private boolean isAuthorizationValid(String authorizationToken) throws URISyntaxException {
        return callerService.callAuthValidateToken(authorizationToken);
    }



    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus)  {

        ServerHttpResponse response = exchange.getResponse();

        response.setStatusCode(httpStatus);

        return response.setComplete();

    }
    /**
     * En este método se procesa las solicitudes que han llegado al gateway.
     * En caso de que una solicitud contenga un header Authorization valida el token
     * para responder dependiendo de la validez y permisos del token
     *@param  config Corresponde a una clase de configuración para el filtro.
     * @return GatewayFilter retorna una respuesta positiva si hay authorización
     * y en otro caso 401 Unauthorized si el token es inválido o no se tienen
     * los permisos correspondientes.
     */
    @Override
    @CrossOrigin("http://localhost:4200/")
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {

            ServerHttpRequest request = exchange.getRequest();

            if (!request.getHeaders().containsKey("Authorization") && (( ( request.getMethod().equals(HttpMethod.GET)  || request.getMethod().equals(HttpMethod.POST) ) && (request.getPath().toString().contains("bookAPI") || request.getPath().toString().contains("editorialAPI"))) || (request.getPath().toString().contains("staffAPI") &&  request.getMethod().equals(HttpMethod.POST)))){
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