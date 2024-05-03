package com.tyb.tyb_backend.repository;

import com.tyb.tyb_backend.model.QuizResult;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultsRepository extends MongoRepository<QuizResult, ObjectId> {

    List<QuizResult> findAllByUserId(String userId);

}
