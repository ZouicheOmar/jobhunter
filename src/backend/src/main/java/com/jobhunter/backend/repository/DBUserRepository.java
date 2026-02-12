package com.jobhunter.backend.repository;

import com.jobhunter.backend.model.DBUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DBUserRepository extends JpaRepository<DBUser, Integer> {
  public DBUser findByUsername(String username);
}
