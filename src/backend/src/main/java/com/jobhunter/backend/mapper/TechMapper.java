package com.jobhunter.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.TechDto;
import com.jobhunter.backend.model.Tech;

@Component
public class TechMapper {

  public Tech toEntity(TechDto dto) {
    var tech = new Tech();
    tech.setName(dto.name());
    return tech;
  }

  public List<Tech> toAllEntity(List<TechDto> allDto) {
    return allDto.stream().map(dto -> toEntity(dto)).collect(Collectors.toList());
  }

  public TechDto toDto(Tech tech) {
    return new TechDto(tech.getName());
  }

  public List<TechDto> toAllDto(List<Tech> tech) {
    return tech.stream().map(t -> toDto(t)).collect(Collectors.toList());
  }

}
