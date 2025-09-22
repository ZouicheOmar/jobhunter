package com.jobhunter.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobhunter.backend.model.Website;

public interface WebsiteRepository extends JpaRepository<Website, Integer> {
  public Website findByName(String name);
}
