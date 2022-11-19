package com.javeriana.authentication.repository;

import com.javeriana.authentication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 * En esta interfaz se exponen los metodos para administrar usuarios
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    /**
     * Busca un usuario por nombre de usuario.
     *@param  username Este parámetro corresponde al nombre del usuario.
     * @return User retorna el usuario que se encontro.
     */
    User findByUserName(String username);
    /**
     * Guarda un usuario.
     *@param  user Este parámetro corresponde al usuario a guardar.
     * @return User retorna el usuario que se guardo.
     */
    User save(User user);
    /**
     * Busca un usuario por nombre de usuario.
     *@param  username Este parámetro corresponde al nombre del usuario.
     * @return User retorna el usuario que se encontro.
     */
    User findUserByUserNameLike(String username);
    /**
     * Busca un usuario por id.
     *@param  id Este parámetro corresponde al id del usuario.
     * @return User retorna el usuario que se encontro.
     */
    User findById(Long id);
}