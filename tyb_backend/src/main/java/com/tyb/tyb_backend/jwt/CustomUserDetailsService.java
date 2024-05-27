package com.tyb.tyb_backend.jwt;

import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Carica l'utente dal repository
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // Costruisci un oggetto UserDetails utilizzando le informazioni dell'utente
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword()) // Assicurati che la password sia criptata nel database
                .roles(user.getRole()) // Supponendo che user.getRoles() restituisca una lista di stringhe
                .build();
    }
}
