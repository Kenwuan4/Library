package com.javeriana.authentication.helper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
/**
 * En esta clase se hace uso de la librearia JWT para generar y validar tokens
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Service
public class JwtUtil {

    private String SECRET_KEY = "secret";
    /**
     * En este método se utiliza para extraer el nombre de usuario del token.
     *@param  token Este parámetro corresponde al bearer token.
     * @return String retorna el usuario que se saco del token.
     */

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    /**
     * En este método se utiliza para extraer la expiracion del token.
     *@param  token Este parametro corresponde al bearer token.
     * @return String retorna la expiracion del token.
     */

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    /**
     * En este método se utiliza para extraer los datos contenidos en el token
     * en para esta clase se extrae el nombre de usuario y la expiración
     *@param  token Este parámetro corresponde al objeto que registra las rutas del gateway.
     *@param  claimsResolver Este parámetro corresponde solucionador de los claims con los que se extraen los datos del token
     * @return T retorna el dato que se saco del token.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    /**
     * En este método se utiliza para extraer todos los datos del payload del token.
     *@param  token Este parametro corresponde al bearer token.
     * @return Claims retorna los claims que estan en el token.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    /**
     * En este método se utiliza para saber si un token ya expiro.
     *@param  token Este parametro corresponde al bearer token.
     * @return String retorna verdarero si el token ha expirado.
     */

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * En este método se utiliza para generar un token a partir de las credenciales del usuario.
     *@param  userDetails Este parametro corresponde a la clase que contiene las credendciales del usuario.
     * @return String retorna una cadena de texto que corresponde al token
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    /**
     * En este método se utiliza para crear un token token.
     *@param  claims Este parametro corresponde los datos que iran dentro del token.
     *@param  subject Este parametro corresponde al sujeto con el que se generara el token, debe ser unico.
     * @return String retorna una cadena de texto que corresponde al token.
     */
    private String createToken(Map<String, Object> claims, String subject) {

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }
    /**
     * En este método se utiliza validar un token.
     *@param  token Este parametro corresponde a la cadena del token.
     *@param  userDetails Este parametro corresponde a la clase que contiene las credenciales del usuario
     * @return String retorna una boleano si el token es valido o no.
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}