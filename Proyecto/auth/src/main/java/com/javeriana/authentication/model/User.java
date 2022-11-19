package com.javeriana.authentication.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
/**
 * En esta clase se manejan las credenciales del usuario.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Entity
@Table(name = "users1")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 45)
    private String userName;

    @Column(nullable = false, length = 64)
    private String password;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )


    private Set<Role> roles = new HashSet<>();
    /**
     * Añade un rol al usuario
     *@param  role Este parámetro corresponde al rol a agregar al usuario
     * @return void
     */

    public void addRole(Role role) {
        this.roles.add(role);
    }
}

