package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.Esito.EnumCodiceEsito;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.dto.ResultUserResponse;
import com.tyb.tyb_backend.exception.TrainYourBrainException;
import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Supplier;
import java.util.logging.Logger;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = Logger.getLogger(UserServiceImpl.class.getName());

    @Override
    public Esito createUser(User user) {
        logger.info("Creating user: " + user.getUsername());
        if (!existUser(user.getUsername())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.insert(user);
            logger.info("User created successfully: " + user.getUsername());
            return new Esito(EnumCodiceEsito.OK, "Utente creato correttamente");
        } else {
            logger.warning("User already exists: " + user.getUsername());
            throw new TrainYourBrainException("Utente già presente");
        }
    }

    @Override
    public ResultUserResponse getUser(User user) {
        logger.info("Getting user: " + user.getUsername());

        User userDetails = userRepository.findByUsername(user.getUsername());
        if (userDetails == null) {
            logger.warning("User not found: " + user.getUsername());
            throw new UsernameNotFoundException("User not found with username: " + user.getUsername());
        }

        if (!passwordEncoder.matches(user.getPassword(), userDetails.getPassword())) {
            logger.warning("Password mismatch for user: " + user.getUsername());
            throw new TrainYourBrainException("Password errata");
        }

        //userDetails.setPassword(null); // Rimuovi la password prima di restituire l'utente

        logger.info("User found: " + user.getUsername());
        return new ResultUserResponse(new Esito(EnumCodiceEsito.OK), userDetails);
    }

    private Boolean existUser(String username) {
        logger.info("Checking if user exists: " + username);
        return userRepository.existsUserByUsername(username);
    }

    private static Supplier<TrainYourBrainException> createCustomException(String message) {
        return () -> new TrainYourBrainException(message);
    }

    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Loading user by username: " + username);
        User user = userRepository.findByUsername(username);
        if (user == null) {
            logger.warning("User not found: " + username);
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user;
    }
}
