package com.javeriana.authentication.service;

import com.javeriana.authentication.model.User;
import com.javeriana.authentication.repository.UserRepository;
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
                builder.roles("USER");
            }
            return builder.build();
        }

        public User saveUser(User user){
            return userRepo.save(user);
        }

        public User getUSer(String user){return userRepo.findUserByUserNameLike(user);}
    }


