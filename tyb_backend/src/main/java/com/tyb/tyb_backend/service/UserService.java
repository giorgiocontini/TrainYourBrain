package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.ResultUserResponse;
import com.tyb.tyb_backend.model.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {

    Esito createUser(User user);

    ResultUserResponse getUser(User user);
}
