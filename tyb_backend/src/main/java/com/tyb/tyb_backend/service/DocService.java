package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.model.Quiz;

import java.io.IOException;
import java.util.List;


public interface DocService {

     Quiz saveDocument(String topic, String topicDescription, List<Question> questions, byte[] fileData,
                             String filename) throws IOException;

}
