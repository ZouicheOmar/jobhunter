package com.jobhunter.backend.repository;

import java.util.List;

import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jobhunter.backend.model.Website;

public interface WebsiteRepository extends JpaRepository<Website, Integer> {
  public Website findByName(String name);

  public List<Website> findAllByNameContaining(String name, Limit limit);
}
