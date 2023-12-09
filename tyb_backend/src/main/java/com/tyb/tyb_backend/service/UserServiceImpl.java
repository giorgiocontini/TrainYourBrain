package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.ResultUserResponse;
import com.tyb.tyb_backend.dto.UserDto;
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
    public String createUser(UserDto userDto) {
        if(!existUser(userDto.getUsername())){
             userRepository.insert(new User(userDto.getUsername(), userDto.getName(),
                            userDto.getSurname(),
                    userDto.getRole(), userDto.getEmail(), userDto.getPassword()));
             return "Utente creato correttamente";
        }else{
            return "Utente già presente";
        }
    }


    @Override
    public ResultUserResponse getUser( UserDto user) {
        return new ResultUserResponse("OK",
                Optional.ofNullable(
                        userRepository.findUserByUsername(user.getUsername())
                ).orElseThrow(
                        createCustomException("Utente non trovato")
                )
        ) ;
    }

    private static Supplier<TrainYourBrainException> createCustomException(String message) {
        return () -> new TrainYourBrainException(message);
    }

    private Boolean existUser (String username){
        return userRepository.existsUserByUsername(username);
    }


}
