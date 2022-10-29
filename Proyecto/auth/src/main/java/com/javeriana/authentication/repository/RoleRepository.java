package com.javeriana.authentication.repository;

import com.javeriana.authentication.model.Role;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role save(Role role);
    List<Role> findAll();

}
