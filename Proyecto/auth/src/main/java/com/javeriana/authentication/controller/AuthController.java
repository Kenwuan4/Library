package com.javeriana.authentication.controller;

import com.javeriana.authentication.helper.JwtUtil;
import com.javeriana.authentication.model.JwtRequest;
import com.javeriana.authentication.model.JwtResponse;
import com.javeriana.authentication.model.User;
import com.javeriana.authentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
/**
 * En esta clase se configura un filtro personalizado para validar el token
 * los mecanismos necesarios para bloquear o aceptar peticiones http.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */

@RestController
@RequestMapping("/authAPI")
@CrossOrigin("http://localhost:4200/")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * En este método HTTP se realiza la autenticación
     @param  jwtRequest Corresponde a la clase que contiene las credenciales usuario y contraseña.
     */
    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest jwtRequest) throws Exception {

        String token = "invalid";

        try{

            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));

            UserDetails user = this.userService.loadUserByUsername(jwtRequest.getUsername());

            token = this.jwtUtil.generateToken(user);

        }catch (Exception e){
            e.printStackTrace();
        }

        if(!token.equals("invalid"))

            return ResponseEntity.ok(new JwtResponse(token));

        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "token not found"
        );
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody User user){

        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping("/validateToken")
    public ResponseEntity<?> validate() {
        return ResponseEntity.ok("authorized");
    }



    //Only ADMIN role can access this
    @PreAuthorize("hasAnyRole('MANAGER')")
    @GetMapping(value = "/welcome")
    public String test(){
        return "Welcome with token !!";
    }


    //Only USER role can access this
    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping(value = "/welcomeuser")
    public String testuser(){
        return "Welcome with token USER !!";
    }
}