package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService  implements UserDetailsService{

        @Autowired
        private UserRepository userRepo;

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
                //System.out.println("ROLE===="+user.getRoles().iterator().next().getName().toString());
                builder.roles("USER");
                //System.out.println("ROLE===="+user.getRoles().iterator().next().getName().toString());
                //builder.roles(user.getRoles().iterator().next().getName().toString());
            }
            return builder.build();
        }

        public User saveUser(User user){
            return userRepo.save(user);
        }


    }


