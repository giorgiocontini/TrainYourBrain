package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.CriteriRicercaUser;
import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;


    @Override
    public String createUser(User user) {
        if(!existUser(user)){
            userRepository.insert(user);
            return "Utente correttamente creato";
        }else{
            return "Utente già presente";
        }
    }

    @Override
    public User getUser(User user) {
        return userRepository.findUserByUsername(user.getUsername());
    }

    private Boolean existUser (User user){
        return (this.getUser(user) != null);
    }


}
