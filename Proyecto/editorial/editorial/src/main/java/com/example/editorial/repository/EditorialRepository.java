package com.example.editorial.repository;

import com.example.editorial.model.Editorial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EditorialRepository extends JpaRepository<Editorial, Integer> {

    Editorial findEditorialByName(String name);
}
