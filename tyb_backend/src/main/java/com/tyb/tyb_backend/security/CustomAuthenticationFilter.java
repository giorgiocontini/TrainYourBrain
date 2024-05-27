package com.tyb.tyb_backend.security;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Logger;

public class CustomAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final Gson gson = new Gson();
    private static final Logger logger = Logger.getLogger(CustomAuthenticationFilter.class.getName());

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(new AntPathRequestMatcher("/api/manage-user/user", "POST"));
        setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {

        logger.info("Attempting authentication");

        // Leggi i dati JSON dal corpo della richiesta
        JsonObject loginData;
        try {
            loginData = gson.fromJson(new InputStreamReader(request.getInputStream()), JsonObject.class);
        } catch (Exception e) {
            logger.severe("Error parsing JSON request string: " + e.getMessage());
            throw new IOException("Error parsing JSON request string", e);
        }

        String username = loginData.get("username").getAsString();
        String password = loginData.get("password").getAsString();

        logger.info("Username: " + username);

        if (username == null || password == null) {
            logger.warning("Username or Password not provided");
            throw new AuthenticationException("Username or Password not provided") {};
        }

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
        return getAuthenticationManager().authenticate(authRequest);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult)
            throws IOException {
        logger.info("Authentication successful for user: " + authResult.getName());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("{\"message\": \"Authentication successful\"}");
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed)
            throws IOException {
        logger.warning("Authentication failed: " + failed.getMessage());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{\"error\": \"Authentication failed\"}");
    }
}
