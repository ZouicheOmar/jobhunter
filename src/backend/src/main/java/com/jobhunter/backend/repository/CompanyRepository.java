package com.jobhunter.backend.repository;

import java.util.List;

import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jobhunter.backend.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
  public Company findByName(String name);

  public List<Company> findAllByNameContaining(String name, Limit limit);
}
