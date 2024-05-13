package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.model.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DocServiceImpl implements DocService {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveDocument(Quiz document, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            document.setFilename(file.getOriginalFilename());
            document.setContentType(file.getContentType());
            document.setData(file.getBytes());
        }
        mongoTemplate.save(document);
    }

}
