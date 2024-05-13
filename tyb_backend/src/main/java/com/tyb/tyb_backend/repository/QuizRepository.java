package com.tyb.tyb_backend.repository;

import com.tyb.tyb_backend.model.Quiz;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends MongoRepository<Quiz, ObjectId> {

    Quiz findQuizByTopic(String topic);

}
