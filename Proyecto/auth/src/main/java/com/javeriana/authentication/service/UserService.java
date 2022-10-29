package com.javeriana.authentication.service;

import com.javeriana.authentication.model.Role;
import com.javeriana.authentication.model.User;
import com.javeriana.authentication.repository.RoleRepository;
import com.javeriana.authentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService  implements UserDetailsService{

    @Autowired private UserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

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

        public User saveUser(User user){
            return userRepo.save(user);
        }

    public Role saveRole(Role role){
        return roleRepo.save(role);
    }

    public List<Role> getRoles(){
        return roleRepo.findAll();
    }


    }


