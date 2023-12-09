package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.CriteriRicercaUser;
import com.tyb.tyb_backend.dto.ResultUserResponse;
import com.tyb.tyb_backend.dto.UserDto;
import com.tyb.tyb_backend.model.User;


public interface UserService {

    String createUser(UserDto user);

    ResultUserResponse getUser(UserDto user);

}
