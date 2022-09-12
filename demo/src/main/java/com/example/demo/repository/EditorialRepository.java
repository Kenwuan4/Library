package com.example.demo.repository;

import com.example.demo.model.Editorial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EditorialRepository extends JpaRepository<Editorial, Integer> {


    List<Editorial> findByNameContaining(String name);

}
