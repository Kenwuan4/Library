package com.javeriana.authentication.model;

import lombok.*;
/**
 * En esta clase sse utiliza para recibir el token del usuario.
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class JwtResponse {
    String token;
}
