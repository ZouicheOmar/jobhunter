package com.jobhunter.backend.repository;

import com.jobhunter.backend.model.Company;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    public Optional<Company> findByName(String name);

    public List<Company> findAllByNameContaining(String name, Limit limit);
}
