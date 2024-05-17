package com.tyb.tyb_backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tyb.tyb_backend.dto.ResultUserResponse;
import com.tyb.tyb_backend.model.User;
import com.tyb.tyb_backend.service.UserService;
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
import java.util.ArrayList;

public class CustomAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final UserService userService; // Inject your user service here

    public CustomAuthenticationFilter(UserService userService, AuthenticationManager authenticationManager) {
        super(new AntPathRequestMatcher("/user", "POST"));
        this.userService = userService;
        setAuthenticationManager(authenticationManager); // Set the authentication manager
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException {
        response.getWriter().write("Login successful");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        response.getWriter().write("Invalid credentials");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

    /**
     * @param request
     * @param response
     * @return
     * @throws AuthenticationException
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public Authentication attemptAuthentication(jakarta.servlet.http.HttpServletRequest request, jakarta.servlet.http.HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        User loginRequest = objectMapper.readValue(request.getInputStream(), User.class);

        ResultUserResponse resultUserResponse = userService.getUser(loginRequest);

        if (resultUserResponse != null) {
            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), loginRequest.getPassword(), new ArrayList<>());

            return getAuthenticationManager().authenticate(authRequest);
        } else {
            throw new AuthenticationException("Invalid credentials") {};
        }
    }
}
