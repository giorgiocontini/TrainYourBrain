package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.CriteriRicercaUser;
import com.tyb.tyb_backend.model.User;


public interface UserService {

    String createUser(User user);

    User getUser(CriteriRicercaUser criteri);

}