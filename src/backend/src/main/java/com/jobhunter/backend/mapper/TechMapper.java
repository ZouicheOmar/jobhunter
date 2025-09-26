package com.jobhunter.backend.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.TechDto;
import com.jobhunter.backend.model.Tech;

@Service
public class TechMapper {

  public Tech toEntity(TechDto dto) {
    var tech = new Tech();
    tech.setName(dto.name());
    return tech;
  }

  public Set<Tech> toAllEntity(Set<TechDto> allDto) {
    return allDto.stream().map(dto -> toEntity(dto)).collect(Collectors.toSet());
  }

  public TechDto toDto(Tech city) {
    return new TechDto(city.getName());
  }

  public Set<TechDto> toAllDto(Set<Tech> tech) {
    return tech.stream().map(t -> toDto(t)).collect(Collectors.toSet());
  }

}
