package com.jobhunter.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobhunter.backend.model.Tech;

@Repository
public interface TechRepository extends JpaRepository<Tech, Integer> {
  public Optional<Tech> findByName(String name);

  public List<Tech> findAllByNameContaining(String name, Limit limit);
}
