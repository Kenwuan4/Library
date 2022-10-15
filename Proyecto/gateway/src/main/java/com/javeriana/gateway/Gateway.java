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

        return builder.routes()
                /*
                .route("discoveryM",r -> r.path("/discoveryAPI/**").uri("lb://discoveryM")
                )

                 */
                .route("authM",r -> r.path("/authAPI/**").uri("lb://authM")
                )
                .route("bookM",r -> r.path("/bookAPI/**").
                        filters(f -> f.filter(authFactory.apply(new AuthGatewayFilterFactory.Config()))).
                        uri("lb://bookM")
                )
                .route("editorialM",r -> r.path("/editorialAPI/**").
                        filters(f -> f.filter(authFactory.apply(new AuthGatewayFilterFactory.Config()))).
                        uri("lb://editorialM")
                )
                .route("staffM",r -> r.path("/staffAPI/**").
                        filters(f -> f.filter(authFactory.apply(new AuthGatewayFilterFactory.Config()))).
                        uri("lb://staffM")
                )
                .build();
    }
}


