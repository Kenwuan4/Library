package com.javeriana.gateway;

import com.javeriana.gateway.filter.AuthGatewayFilterFactory;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
/**
 * Este gateway actua como intermediario entre los clientes y los microservicios,
 * filtra las peticiones entrantes para verificar autorización en caso de que sea requerida
 * llamando al microservicio de autenticación.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */

@Configuration
@CrossOrigin("http://localhost:4200/")
public class Gateway {
    /**
     * En este método se utiliza para registrar las direccinones
     * que va a usar el gateway así como para aplicarle los filtros
     * cada vez que se enviá una solicitud a este.
     *@param  builder Este parámetro corresponde al objeto que registra las rutas del gateway.
     *@param  authFactory Este parámetro corresponde al filtro
     *                    creado para procesar las peticiones enviadas al gateway.
     * @return builder retorna el RouteLocator con las rutas y filtros configuradas.
     */
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder, AuthGatewayFilterFactory authFactory) {

        return builder.routes()
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


