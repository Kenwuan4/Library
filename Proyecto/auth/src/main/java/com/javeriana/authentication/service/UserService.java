package com.javeriana.authentication.service;

import com.javeriana.authentication.model.User;
import com.javeriana.authentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
/**
 * En este servicio se manejan las credenciales para realizar autenticacion.
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@Service
public class UserService  implements UserDetailsService{

        @Autowired
        private UserRepository userRepo;

    /**
     * En este método se autenticar un usuario
     *@param  username Este parámetro corresponde al nombre de usuario
     * @return String retorna el usuario autenticado
     */

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user = userRepo.findByUserName(username);
            org.springframework.security.core.userdetails.User.UserBuilder builder = null;
            if (user == null){
                throw new UsernameNotFoundException("User not Found");
            }
            else {
                builder = org.springframework.security.core.userdetails.User.withUsername(username);
                builder.password(new BCryptPasswordEncoder().encode(user.getPassword()));
                builder.roles("USER");
            }
            return builder.build();
        }
    /**
     * En este método se utiliza para guardar un usuario.
     *@param  user Este parámetro corresponde al user a guardar
     * @return String retorna el usuario que se saco del token.
     */
        public User saveUser(User user){
            return userRepo.save(user);
        }
    /**
     * En este método se utiliza para encontrar un usuario por nombre de usuario.
     * @param  user Este parámetro corresponde al nombre del usuario.
     * @return String retorna el usuario que se saco del token.
     */
        public User getUSer(String user){return userRepo.findUserByUserNameLike(user);}
    }


