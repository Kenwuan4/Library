package com.example.demo.controller;

import com.example.demo.helper.JwtUtil;
import com.example.demo.model.JwtRequest;
import com.example.demo.model.JwtResponse;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody JwtRequest jwtRequest) throws Exception {

        System.out.println(jwtRequest);
        String token = "Usuario no válido";
        try{
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
            UserDetails user = this.userService.loadUserByUsername(jwtRequest.getUsername());
            token = this.jwtUtil.generateToken(user);
            System.out.println("Token = "+token);

        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok(new JwtResponse(token));

    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody User user){

        return ResponseEntity.ok(userService.saveUser(user));
    }


    //Only ADMIN role can access this
    @PreAuthorize("hasAnyRole('MANAGER')")
    @RequestMapping(value = "/welcome", method = RequestMethod.GET)
    public String test(){
        return "Welcome with token !!";
    }


    //Only USER role can access this
    @PreAuthorize("hasAnyRole('USER')")
    @RequestMapping(value = "/welcomeuser", method = RequestMethod.GET)
    public String testuser(){
        return "Welcome with token USER !!";
    }
}