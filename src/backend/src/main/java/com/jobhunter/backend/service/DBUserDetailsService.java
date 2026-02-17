package com.jobhunter.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import com.jobhunter.backend.enums.AuthorityType;
import com.jobhunter.backend.model.DBUser;
import com.jobhunter.backend.repository.DBUserRepository;
import com.jobhunter.backend.security.DBUserDetails;

@Service
public class DBUserDetailsService implements UserDetailsService {

  @Autowired
  private DBUserRepository dbUserRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    DBUser user = dbUserRepository.findByUsername(username);
    // return new User(user.getUsername(), user.getPassword(),
    // getGrantedAuthorities(user.getAuthority()));
    // return new User(user.getUsername(), user.getPassword(),
    // getGrantedAuthorities(user.getAuthority()));

    return new DBUserDetails(user);
  }

  public DBUser getByUsername(String username) {
    DBUser user = dbUserRepository.findByUsername(username);
    return user;
  }

  public DBUser createUser(String username, String password) {

    DBUser user = dbUserRepository.findByUsername(username);
    if (user != null)
      return user;

    DBUser u = new DBUser();

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    u.setUsername(username);
    u.setPassword(encoder.encode(password));

    dbUserRepository.save(u);

    return u;
  }

  private List<GrantedAuthority> getGrantedAuthorities(AuthorityType role) {
    List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
    authorities.add(new SimpleGrantedAuthority(role.toString()));
    return authorities;
  }

  public Integer saveAdmin(DBUser user) {
    String username = user.getUsername();
    DBUser res = dbUserRepository.findByUsername(username);

    if (res != null)
      return -1;

    dbUserRepository.save(user);
    return 0;
  }

}
