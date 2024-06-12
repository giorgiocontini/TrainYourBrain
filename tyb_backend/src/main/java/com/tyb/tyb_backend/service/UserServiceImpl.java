package com.tyb.tyb_backend.service;

import com.tyb.tyb_backend.dto.*;
import com.tyb.tyb_backend.dto.Esito.EnumCodiceEsito;
import com.tyb.tyb_backend.dto.Esito.Esito;
import com.tyb.tyb_backend.exception.TrainYourBrainException;
import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Objects;
import java.util.function.Supplier;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = Logger.getLogger(UserServiceImpl.class.getName());
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private static Supplier<TrainYourBrainException> createCustomException(String message) {
        return () -> new TrainYourBrainException(message);
    }

    @Override
    public Esito createUser(User user) {
        logger.info("Creating user: " + user.getUsername());


        Boolean isEmailAdminPresentAndUsernameNull = userRepository.findByRole("A").stream()
                .filter(admin -> (
                        //se l'email dell'utente che si sta registrando come Admin è presente nella lista gli
                        // permetto di fcreare l'utenza
                        Objects.equals(admin.getEmail(), user.getEmail())
                                //lo username deve essere null alla prima registrazione
                                && admin.getUsername() == null))
                .findFirst().isPresent();

        Boolean isEmailAdminPresent = userRepository.findByRole("A").stream()
                .filter(admin -> (
                        //se l'email dell'utente che si sta registrando come Admin è presente nella lista gli
                        // permetto di fcreare l'utenza
                        Objects.equals(admin.getEmail(), user.getEmail())))
                .findFirst().isPresent();


        if (user.getRole().equals("A") && isEmailAdminPresentAndUsernameNull) {
            //l'utente è un admin nominato non ancora consolidato (manca lo username)
            User userFromDb = userRepository.findByEmail(user.getEmail());

            userFromDb.setPassword(passwordEncoder.encode(user.getPassword()));
            userFromDb.setUsername(user.getUsername());
            userRepository.save(userFromDb);
            logger.info("User created successfully: " + userFromDb.getUsername());
            return new Esito(EnumCodiceEsito.OK, "Utente creato correttamente");

        } else if (user.getRole().equals("S")
                && !userRepository.existsUserByUsername(user.getUsername())
                && !isEmailAdminPresent) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.insert(user);
            logger.info("User created successfully: " + user.getUsername());
            return new Esito(EnumCodiceEsito.OK, "Utente creato correttamente");
        } else if (userRepository.existsUserByUsername(user.getUsername()) || isEmailAdminPresent) {
            //se esiste lo username l'utente è consolidato
            logger.warning("User already exists: " + user.getUsername());
            throw new TrainYourBrainException("Utente già presente");
        } else {
            throw new TrainYourBrainException("Non è prevista un utenza da Admin per le credenziali inserite. " +
                    "contattare un'amministratore");
        }

    }

    @Override
    public Esito deleteUser(DeleteUserDto dto) {
        logger.info("Deleting user: " + dto.getUsername());
        if (userRepository.existsUserByUsername(dto.getUsername())) {
            User userLoadedFromDb = userRepository.findByUsername(dto.getUsername());
            if (passwordEncoder.matches(dto.getPassword(), userLoadedFromDb.getPassword())) {
                userRepository.delete(userLoadedFromDb);
                logger.info("User deleted successfully: " + dto.getUsername());
                return new Esito(EnumCodiceEsito.OK, "Utente eliminato correttamente");
            }
            return new Esito(EnumCodiceEsito.KO, "La password non è corretta");

        } else {
            logger.warning("User doesn't exists: " + dto.getUsername());
            throw new TrainYourBrainException("Utente non presente");
        }
    }

    @Override
    public Esito changePassword(ChangePasswordDto dto) {
        logger.info("Changing user password: " + dto.getUsername());
        if (userRepository.existsUserByUsername(dto.getUsername())) {
            User userLoadedFromDb = userRepository.findByUsername(dto.getUsername());
            if (passwordEncoder.matches(dto.getOldPassword(), userLoadedFromDb.getPassword())) {
                userLoadedFromDb.setPassword(passwordEncoder.encode(dto.getNewPassword()));
                logger.info("Password changed");

                userRepository.save(userLoadedFromDb);
                return new Esito(EnumCodiceEsito.OK, "Password aggiornata correttamente");
            }
            return new Esito(EnumCodiceEsito.KO, "La password non è corretta");

        } else {
            logger.warning("User doesn't exists: " + dto.getUsername());
            throw new TrainYourBrainException("Utente non presente");
        }
    }

    @Override
    public Esito addAdmin(AddAdminDto dto) {
        //in fase di nomina
        //se non esiste aggiungere l'utente nella tabella user senza username (questo verrà inserito
        // nel momento della prima registrazione da parte dell'utente) ma solo con email
        User user = userRepository.findByEmail(dto.getEmail());
        //Se l'email esiste non la facciamo aggiungere
        if (user != null) {
            return new Esito(EnumCodiceEsito.KO, "Email già presente");
        } else {

            // Definizione del formato desiderato
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            // Formattazione della data nella stringa
            String dataFormattata = sdf.format(new Date());

            User userToAdd = new User();
            userToAdd.setEmail(dto.getEmail());
            userToAdd.setRole("A");
            //setto la data
            userToAdd.setDataNomina(dataFormattata);
            userToAdd.setNominante(dto.getNominante());

            userRepository.insert(userToAdd);
        }
        return new Esito(EnumCodiceEsito.OK, "Email inserita correttamente");
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


    @Override
    public ResultAdminsResponse getAdmins() {
        ArrayList<User> result = userRepository.findByRole("A");
        ArrayList<AdminDto> resList = result.stream().map(user -> {
            AdminDto dtoRes = new AdminDto();
            dtoRes.setDataNomina(user.getDataNomina());
            dtoRes.setEmail(user.getEmail());
            dtoRes.setNominante(user.getNominante());
            dtoRes.setUsername(user.getUsername());
            return dtoRes;
        }).collect(Collectors.toCollection(ArrayList::new));

        return new ResultAdminsResponse(!result.isEmpty() ? new Esito(EnumCodiceEsito.OK) : new Esito(EnumCodiceEsito.KO),
                resList);
    }
}
