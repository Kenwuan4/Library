package com.javeriana.gateway;

import com.javeriana.gateway.filter.AuthGatewayFilterFactory;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class Gateway {
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder, AuthGatewayFilterFactory authFactory) {
        //@formatter:off
        // String uri = "http://httpbin.org:80";
        // String uri = "http://localhost:9080";
        return builder.routes()
                .route("bookM",r -> r.path("/bookAPI/**").
                        filters(f -> f.filter(authFactory.apply(new AuthGatewayFilterFactory.Config()))).
                        uri("lb://bookM")
                )
                .route("authM",r -> r.path("/authAPI/**").uri("lb://authM")
                        )
                .build();
    }
}


