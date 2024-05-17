package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.model.Question;
import com.tyb.tyb_backend.model.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class DocServiceImpl implements DocService {
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * @param topic
     * @param topicDescription
     * @param questions
     * @param fileData
     * @param filename
     * @return
     * @throws IOException
     */
    @Override
    public Quiz saveDocument(String topic, String topicDescription, List<Question> questions, byte[] fileData, String filename) throws IOException {
        return null;
    }

    //public Quiz saveDocument(String topic, String topicDescription, List<Question> questions, byte[] fileData,
    //                      String filename) throws IOException {
    //    Quiz document = new Quiz();
    //    document.setTopic(topic);
    //    document.setTopicDescription(topicDescription);
    //    document.setQuestions(questions);
    //    document.setFileData(fileData);
    //    document.setFilename(filename);
//
    //    mongoTemplate.save(document);
    //    return document;
    //}

}
