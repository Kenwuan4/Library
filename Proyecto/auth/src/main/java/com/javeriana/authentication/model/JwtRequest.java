package com.javeriana.authentication.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
/**
 * En esta clase se utiliza para recibir las credenciales del usuario
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Getter
@Setter
@ToString
public class JwtRequest {

    String username;
    String password;
}