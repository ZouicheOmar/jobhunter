package com.jobhunter.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobhunter.backend.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
  public Company findByName(String name);
  // size should match to an enum
  // public List<Company> findBySize(String size);
}
