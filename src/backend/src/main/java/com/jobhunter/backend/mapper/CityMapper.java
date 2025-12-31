package com.jobhunter.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

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

  public List<CityDto> toAllDto(List<City> cities) {
    return cities.stream().map(city -> toDto(city)).collect(Collectors.toList());
  }

}
