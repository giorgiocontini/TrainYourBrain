package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.CriteriRicercaUser;
import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;


    @Override
    public void createUser(User user) {
        userRepository.insert(user);
    }

    @Override
    public User getUser(CriteriRicercaUser criteri) {
        return userRepository.findUserByUsernameAndPassword(criteri.getUsername(), criteri.getPassword());
    }


}