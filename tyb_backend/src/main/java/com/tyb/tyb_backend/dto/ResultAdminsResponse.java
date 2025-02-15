package com.tyb.tyb_backend.dto;

import com.tyb.tyb_backend.dto.Esito.Esito;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResultAdminsResponse {

    private Esito esito;
    private ArrayList<AdminDto> result;

}
