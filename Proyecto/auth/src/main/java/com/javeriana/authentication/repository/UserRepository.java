package com.javeriana.authentication.repository;


import com.javeriana.authentication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserName(String username);
    User save(User user);
}