package com.javeriana.authentication.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
/**
 * En esta clase se hace usa para manejar los roles.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 45)
    @Enumerated(EnumType.STRING)
    private Roles name;

    public Role() { }

}