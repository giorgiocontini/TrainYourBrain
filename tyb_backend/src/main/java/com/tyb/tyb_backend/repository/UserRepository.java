package com.tyb.tyb_backend.repository;

import com.tyb.tyb_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);

    User findUserByUsernameAndPassword(String username, String password);

    Boolean existsUserByUsername(String username);
}
