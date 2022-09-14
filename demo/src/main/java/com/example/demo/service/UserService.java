package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.model.MyUserDetails;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService  implements UserDetailsService{

    @Autowired
    UserRepository userRepository;

    public User saveUser(User user) {
        System.out.print(user.getUserName());
        return userRepository.save(user);
    }

    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUserName(userName);

        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + userName));

        return user.map(MyUserDetails::new).get();
    }

    public void deleteUser (int id){
        userRepository.deleteById(id);
    }

    public User update (User user){
        return userRepository.save(user);
    }

}


