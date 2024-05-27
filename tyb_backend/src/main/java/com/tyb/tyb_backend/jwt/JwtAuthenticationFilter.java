package com.tyb.tyb_backend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Logger;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private final UserDetailsService userDetailsService;

    private static final Logger logger = Logger.getLogger(JwtAuthenticationFilter.class.getName());

    public JwtAuthenticationFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String username = null;
        String authToken = null;

        logger.info("Processing authentication for request: " + request.getRequestURI());

        if (header != null && header.startsWith("Bearer ")) {
            authToken = header.substring(7);
            logger.info("Found Bearer token: " + authToken);
            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(jwtSecret)
                        .parseClaimsJws(authToken)
                        .getBody();
                username = claims.getSubject();
                logger.info("JWT claims found: " + claims);
            } catch (Exception e) {
                logger.severe("JWT Token processing error: " + e.getMessage());
            }
        } else {
            logger.warning("Could not find Bearer string, header will be ignored");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            logger.info("Username found: " + username);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken).getBody().getSubject().equals(userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                logger.info("Authenticated user: " + username + ", setting security context");
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                logger.warning("JWT token validation failed for user: " + username);
            }
        } else {
            logger.warning("Username is null or SecurityContextHolder already has authentication");
        }

        chain.doFilter(request, response);
    }
}
