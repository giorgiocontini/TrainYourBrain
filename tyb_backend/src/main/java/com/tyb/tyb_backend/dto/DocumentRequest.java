package com.tyb.tyb_backend.dto;

import com.tyb.tyb_backend.model.Question;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class DocumentRequest {
    private String topic;
    private String topicDescription;
    private List<Question> questions;
    private byte[] file;

    // Getter e setter
}
