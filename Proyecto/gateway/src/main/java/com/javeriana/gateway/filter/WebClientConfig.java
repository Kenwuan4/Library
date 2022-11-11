package com.javeriana.gateway.filter;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    @LoadBalanced
    @CrossOrigin("http://localhost:4200/")
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder();
    }

}
