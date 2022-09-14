package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userDetailsService;

    @PostMapping("/register")
    private User saveEditorial(@RequestBody User user){
        return userDetailsService.saveUser(user);
    }

    @DeleteMapping("/user/{id}")
    private void deleteUser(@PathVariable("id") int id ){
        userDetailsService.deleteUser(id);
    }

    @GetMapping("/users")
    private List<User> getAllBooks(){
        return userDetailsService.listUsers();
    }

    @PutMapping("/user")
    private User updateBook(@RequestBody User user)
    {
        return userDetailsService.update(user);
    }

}
