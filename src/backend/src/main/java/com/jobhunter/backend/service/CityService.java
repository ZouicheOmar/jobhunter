package com.jobhunter.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.model.City;
import com.jobhunter.backend.repository.CityRepository;

@Service
public class CityService {

  private final CityRepository cityRepository;

  public CityService(CityRepository cityRepository) {
    this.cityRepository = cityRepository;
  }

  public String save(City city) {
    cityRepository.save(city);
    return "city saved";
  }

  public List<City> findAll() {
    return cityRepository.findAll();
  }

  public City findOrCreateByName(String name) {
    City cityQuery = cityRepository.findByName(name);
    if (cityQuery == null) {
      City cityToAdd = new City();
      cityToAdd.setName(name);
      cityRepository.save(cityToAdd);
      return cityToAdd;
    }
    return cityQuery;
  }

}
