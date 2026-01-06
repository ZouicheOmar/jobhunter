package com.jobhunter.backend.repository;

import com.jobhunter.backend.model.Website;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebsiteRepository extends JpaRepository<Website, Integer> {
    public Optional<Website> findByName(String name);

    public List<Website> findAllByNameContaining(String name, Limit limit);
}
