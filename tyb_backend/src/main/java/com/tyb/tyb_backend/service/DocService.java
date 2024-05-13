package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.model.Quiz;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


public interface DocService {

    void saveDocument(Quiz document, MultipartFile file) throws IOException;

}
