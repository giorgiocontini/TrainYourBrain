package com.tyb.tyb_backend.services;

import com.tyb.tyb_backend.entities.User;
import com.tyb.tyb_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public void createUser(User user) {
        userRepository.save(user);
    }

    /**
     * @param user
     */
    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    /**
     * @param id
     */
    @Override
    public void deleteUserById(String id) {

    }

    /**
     * @param user
     */
    @Override
    public void updateUser(User user) {

    }

    /**
     * @param user
     * @return
     */
    @Override
    public User getUser(User user) {

        return null;
    }
}