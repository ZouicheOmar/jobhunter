package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.dto.LoginRequest;
import com.jobhunter.backend.mapper.CityMapper;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.service.CityService;
import com.jobhunter.backend.service.UserService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // @PostMapping("/logout")
    // public ResponseEntity<?> logout(HttpServletRequest response) {
    // return ResponseEntity.noContent().build();
    // }

    // @PostMapping("/login")
    // public ResponseEntity<?> login(
    // @RequestBody LoginRequest request,
    // HttpServletRequest httpRequest) {
    //
    // Authentication auth = authenticationManager.authenticate(
    // new UsernamePasswordAuthenticationToken(
    // request.username(),
    // request.password()));
    //
    // SecurityContextHolder.getContext().setAuthentication(auth);
    // httpRequest.getSession(true);
    // return ResponseEntity.ok().build();
    // }
    // j

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest reqbody, HttpServletRequest req) {
        String username = reqbody.username();
        String password = reqbody.password();

        Authentication authRes = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authRes);
        SecurityContextHolder.setContext(context);
        HttpSession session = req.getSession(true);
        session.setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                context);

        return ResponseEntity.ok().build();

    }

    @GetMapping("/me")
    public String debug(Authentication authentication) {
        return authentication == null ? "NOT AUTHENTICATED"
                : "AUTHENTICATED: " + authentication.getName();
    }
}
