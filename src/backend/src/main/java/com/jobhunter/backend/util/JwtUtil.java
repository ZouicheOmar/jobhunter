package com.jobhunter.backend.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.Authentication;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j // defines and manages log()
public class JwtUtil {
  // private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${app.jwt.secret}")
  private String jwtSecret;

  @Value("${app.jwt.expiration.ms}")
  private int jwtExpirationMs;

  public String generateToken(Authentication authentication) {
    UserDetails user = (UserDetails) authentication.getPrincipal();
    Date now = new Date();
    Date exp = new Date(now.getTime() + jwtExpirationMs);

    return Jwts.builder()
      .setSubject(user.getUsername())
      .setIssuedAt(now)
      .setExpiration(exp)
      .signWith(key() , SignatureAlgorithm.HS256)
      .compact();
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String extractUsername(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build()
      .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
      return true;
    } catch (MalformedJwtException e) {
      log.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      log.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      log.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      log.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }
}
