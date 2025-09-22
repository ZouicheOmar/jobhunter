package com.jobhunter.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobhunter.backend.model.City;

public interface CityRepository extends JpaRepository<City, Integer> {
  public City findByName(String name);
}
