package com.jobhunter.backend.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.jobhunter.backend.enums.AuthorityType;
import com.jobhunter.backend.model.DBUser;

import org.springframework.security.core.authority.GrantedAuthoritiesContainer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class DBUserDetails implements UserDetails {

  private Integer id;
  private String username;
  private String password;
  private Collection<? extends GrantedAuthority> authorities;

  public DBUserDetails(DBUser user) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.password = user.getPassword();
    this.authorities = Collections.unmodifiableCollection(Arrays.asList(
        new SimpleGrantedAuthority(user.getAuthority().toString())));
  }

  public Integer getId() {
    return id;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}
