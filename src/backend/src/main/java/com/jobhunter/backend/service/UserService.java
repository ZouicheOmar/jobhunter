package com.jobhunter.backend.service;

import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.repository.TechRepository;

import jakarta.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Limit;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public ResponseEntity<?> loginUser(String loginRequest) {
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> getCurrentUser(String loginRequest) {
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        return ResponseEntity.ok().build();
    }
}
