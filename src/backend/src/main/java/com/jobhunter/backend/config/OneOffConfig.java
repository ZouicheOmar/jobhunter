package com.jobhunter.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobhunter.backend.enums.AuthorityType;
import com.jobhunter.backend.model.DBUser;
import com.jobhunter.backend.service.DBUserDetailsService;

import lombok.extern.slf4j.Slf4j;

// @Service
@Slf4j
public class OneOffConfig {
  @Autowired
  private DBUserDetailsService dbUserDetailsService;

  public static DBUser createAdmin() {
    DBUser admin = new DBUser();
    admin.setUsername("admin");
    admin.setAuthority(AuthorityType.ROLE_ADMIN);
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    String pass = encoder.encode("pass");
    admin.setPassword(pass);

    return admin;
  }

  public DBUser createUser(String name, String password) {
    DBUser u = dbUserDetailsService.createUser(name, password);
    log.info("CREATED USER===================================");
    return u;
  }
}
