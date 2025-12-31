package com.jobhunter.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

import com.jobhunter.backend.model.City;
import com.jobhunter.backend.mapper.CityMapper;
import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.repository.CityRepository;

// lombok ??..
@Service
public class CityService {
  // TODO should not have mapper in here

  private final CityRepository cityRepository;
  private final CityMapper cityMapper;

  public CityService(CityRepository cityRepository, CityMapper cityMapper) {
    this.cityRepository = cityRepository;
    this.cityMapper = cityMapper;
  }

  public CityDto save(City city) {
    return cityMapper.toDto(cityRepository.save(city));
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

  public List<CityDto> findAll() {
    return cityRepository.findAll().stream().map(city -> cityMapper.toDto(city)).collect(Collectors.toList());
  }

  public List<City> findAllByNameContaining(String cityName) {
    return cityRepository.findAllByNameContaining(cityName, Limit.of(4));
  }

  public List<City> findAllByZipcodeContaining(String zipcodeStr) {
    return cityRepository.findAllByZipcodeContaining(zipcodeStr);
  }

}
