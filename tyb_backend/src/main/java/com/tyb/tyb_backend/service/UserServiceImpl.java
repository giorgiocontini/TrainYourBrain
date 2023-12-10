package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.EnumCodiceEsito;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.Esito.EsitoResponse;
import com.tyb.tyb_backend.dto.ResultUserResponse;
import com.tyb.tyb_backend.exception.TrainYourBrainException;
import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Supplier;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;



    @Override
    public Esito createUser(User user) {
        if (!existUser(user.getUsername())) {
            userRepository.insert(user);
            return new Esito(EnumCodiceEsito.OK, "Utente creato correttamente");
        } else {
            throw new TrainYourBrainException("Utente già presente");
        }
    }

    @Override
    public ResultUserResponse getUser(User user) {
        return new ResultUserResponse(new Esito(EnumCodiceEsito.OK),
                Optional.ofNullable(userRepository.findUserByUsername(user.getUsername()))
                        .orElseThrow(createCustomException("Utente non trovato")));
    }

    private Boolean existUser(String username) {
        return userRepository.existsUserByUsername(username);
    }

    private static Supplier<TrainYourBrainException> createCustomException(String message) {
        return () -> new TrainYourBrainException(message);
    }


}
