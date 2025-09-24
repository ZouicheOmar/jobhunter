package com.jobhunter.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobhunter.backend.model.Tech;

public interface TechRepository extends JpaRepository<Tech, Integer> {
  public Tech findByName(String name);
}
