package com.jobhunter.backend.mapper;

import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.model.City;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class CityMapper {

    // Pas besoin de to entity......
    public City toEntity(CityDto dto) {
        City city = new City();
        city.setId(dto.id());

        return city;
    }

    public CityDto toDto(City city) {
        return new CityDto(city.getId(), city.getName());
    }

    public List<CityDto> toAllDto(List<City> cities) {
        return cities
            .stream()
            .map(city -> toDto(city))
            .collect(Collectors.toList());
    }
}
