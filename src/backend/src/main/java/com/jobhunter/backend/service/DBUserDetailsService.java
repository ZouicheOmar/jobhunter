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

@Service
public class DBUserDetailsService implements UserDetailsService {

  @Autowired
  private DBUserRepository dbUserRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    DBUser user = dbUserRepository.findByUsername(username);
    return new User(user.getUsername(), user.getPassword(), getGrantedAuthorities(user.getAuthority()));
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
