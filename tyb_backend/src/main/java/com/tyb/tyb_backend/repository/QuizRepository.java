package com.tyb.tyb_backend.repository;

import com.tyb.tyb_backend.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends MongoRepository<Question, String> {

    List<Question> findAllByTopic(String topic);


}
