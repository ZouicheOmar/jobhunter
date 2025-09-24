package com.jobhunter.backend.service;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.model.City;

@Service
public class CityMapper {

  public City toEntity(CityDto dto) {
    var city = new City();
    city.setName(dto.name());
    return city;
  }

  public CityDto toDto(City city) {
    return new CityDto(city.getName());
  }

}
