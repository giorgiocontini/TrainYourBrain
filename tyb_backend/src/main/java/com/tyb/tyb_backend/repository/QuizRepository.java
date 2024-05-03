package com.tyb.tyb_backend.repository;

import com.tyb.tyb_backend.model.Question;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends MongoRepository<Question, ObjectId> {

    List<Question> findAllByTopic(String topic);

}
