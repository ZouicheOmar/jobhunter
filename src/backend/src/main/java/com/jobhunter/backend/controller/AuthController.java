package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.LoginRequest;
import com.jobhunter.backend.model.DBUser;
import com.jobhunter.backend.security.DBUserDetails;
import com.jobhunter.backend.service.DBUserDetailsService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    DBUserDetailsService dbUserDetailsService;

    private AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest reqbody, HttpServletRequest req) {
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

        return ResponseEntity.ok(username);
    }

    @GetMapping("/meme")
    public String me(@AuthenticationPrincipal DBUserDetails principal) {
        if (principal == null)
            return "NOT AUTHENTICATED: ";

        String username = principal.getUsername();
        Integer id = principal.getId();

        return "PRINCIPAL USER: " + username + ", id : " + id.toString() + "\n";
    }

    @GetMapping("/me")
    public void debug(Authentication authentication, HttpServletResponse response) {
        if (authentication == null)
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
