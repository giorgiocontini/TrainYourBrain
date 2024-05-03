package com.tyb.tyb_backend.dto;

import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.model.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResultQuizResponse {

    private Esito esito;
    private List<Question> result;

}
