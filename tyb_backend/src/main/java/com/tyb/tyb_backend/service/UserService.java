package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.Esito.EsitoResponse;
import com.tyb.tyb_backend.dto.ResultUserResponse;
import com.tyb.tyb_backend.model.User;


public interface UserService {

    Esito createUser(User user);

    ResultUserResponse getUser(User user);

}
