package com.tyb.tyb_backend.repository;

import com.tyb.tyb_backend.dto.CriteriRicercaUser;
import com.tyb.tyb_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findUserByUsername (String username);

    Boolean existsUserByUsername(String username);
}
