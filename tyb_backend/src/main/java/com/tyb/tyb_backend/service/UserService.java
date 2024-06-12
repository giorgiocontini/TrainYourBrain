package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.*;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.model.User;

import java.util.ArrayList;

public interface UserService {

    Esito createUser(User user);

    ResultUserResponse getUser(User user);

    Esito deleteUser(DeleteUserDto dto);

    Esito changePassword(ChangePasswordDto dto);

    Esito addAdmin(AddAdminDto dto);

    ResultAdminsResponse getAdmins();

}
