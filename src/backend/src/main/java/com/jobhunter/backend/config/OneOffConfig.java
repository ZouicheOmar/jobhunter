package com.jobhunter.backend.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.jobhunter.backend.enums.AuthorityType;
import com.jobhunter.backend.model.DBUser;

public class OneOffConfig {

  public static DBUser createAdmin(){
    DBUser admin = new DBUser();
    admin.setUsername("admin");
    admin.setAuthority(AuthorityType.ROLE_ADMIN);
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    String pass = encoder.encode("pass");
    admin.setPassword(pass);

    return admin;
  }
}
