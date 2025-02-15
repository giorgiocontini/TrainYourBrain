package com.tyb.tyb_backend.repository;

import com.tyb.tyb_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);

    Boolean existsUserByUsername(String username);
    Boolean existsUserByEmail(String email);

    User findByEmail(String email);

    User findByUsernameOrEmail(String username, String email);

    ArrayList<User> findByRole(String role);
}
