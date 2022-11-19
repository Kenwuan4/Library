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
     * En este método HTTP GET se hacen una busqueda de un usuario por su ID.
     *@param  userName Este parametro corresponde al usuario a buscar
     * @return User retorna el usuario encontrado.
     */

    @GetMapping("/user/{userName}")
    public User getUserByID(@PathVariable("userName") String userName){
        return userService.getUSer(userName);
    }


    /**
     * En este método HTTP POST se realiza la autenticación
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
    /**
     * En este método HTTP PUT se actualiza un usuario.
     *@param  user Este parametro corresponde al usuario a actualualizar.
     * @return User retorna el usuario actualizado.
     */

    @PutMapping("user/update")
    public User updateUser(@RequestBody User user){
        return userService.saveUser(user);
    }
    /**
     * En este método HTTP POST se registra un usuario.
     *@param  user Este parametro corresponde al usuario a registrar.
     * @return User retorna el usuario registrado.
     */
    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody User user){

        return ResponseEntity.ok(userService.saveUser(user));
    }
    /**
     * En este método HTTP GET se valida un token
     * @return Boolean retorna verdadero si el token es valido.
     */

    @GetMapping("/validateToken")
    public ResponseEntity<?> validate() {
        return ResponseEntity.ok(true);
    }

    /**
     * En este método HTTP GET se valida el rol MANAGER
     * @return String retorna una cadena si rol es valido
     */


    //Only ADMIN role can access this
    @PreAuthorize("hasAnyRole('MANAGER')")
    @GetMapping(value = "/welcome")
    public String test(){
        return "Welcome with token !!";
    }

    /**
     * En este método HTTP GET se valida el rol USER
     * @return String una cadena  si rol es valido.
     */

    //Only USER role can access this
    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping(value = "/welcomeuser")
    public String testuser(){
        return "Welcome with token USER !!";
    }
}