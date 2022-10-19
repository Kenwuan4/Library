package com.javeriana.authentication.config;

import com.javeriana.authentication.helper.JwtUtil;
import com.javeriana.authentication.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
/**
 * En esta clase se configura un filtro personalizado para validar el token
 * los mecanismos necesarios para bloquear o aceptar peticiones http.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtutil;

    @Autowired
    private UserService customUserService;
    /**
     * En este método se toma el token, se extrae el usuario y contraseña para verificar la autenticación
     * y determinar si el token es válido.
     *@param  request Corresponde a la clase de la solicitud que llega al filtro
     *@param  response Corresponde a la clase de la respuesta que sale del filtro
     *@param  filterChain Corresponde a la clase que llama el ejejcuta el filtro
     * @return void.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //get header
        //Start with Bearer
        //validate
        String reqTokenHeader = request.getHeader("Authorization");
        String userName = null;
        String jwtToken = null;

        try {

            if (reqTokenHeader != null && reqTokenHeader.startsWith("Bearer ")) {
                String tokenWithoutBearer = reqTokenHeader.substring(7);

                try {
                    userName = this.jwtutil.extractUsername(tokenWithoutBearer);
                    System.out.println(userName);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                //válida que el usuario extraído del token este registrado, tenga los permisos correspondientes
                // y modifica el SecurityContextHolder dependiendo del resultado
                UserDetails user = this.customUserService.loadUserByUsername(userName);
                if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    System.out.println(user.getPassword());
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                } else {
                    //any message
                    System.out.println("Token not validated!!");
                }
            }


            filterChain.doFilter(request, response);
        }
        catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException ex) {
            logger.error("Could not set user authentication in security context", ex);
        }

    }

}


