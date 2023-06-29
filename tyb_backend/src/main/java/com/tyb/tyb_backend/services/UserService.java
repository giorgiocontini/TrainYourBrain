package com.tyb.tyb_backend.services;

import com.tyb.tyb_backend.entities.User;

public interface UserService {

    void createUser(User user);

    void deleteUser(User user);

    void deleteUserById(String id);

    void updateUser(User user);

    User getUser(User user);




}