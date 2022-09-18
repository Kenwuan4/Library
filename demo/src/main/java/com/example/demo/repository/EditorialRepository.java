package com.example.demo.repository;

import com.example.demo.model.Editorial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EditorialRepository extends JpaRepository<Editorial, Integer> {

    Editorial findByNameContaining(String name);
    Editorial findEditorialByName(String name);
}
