package com.jobhunter.backend.mapper;

import com.jobhunter.backend.dto.TechCreateDto;
import com.jobhunter.backend.dto.TechDto;
import com.jobhunter.backend.model.Tech;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class TechMapper {

    public Tech createToEntity(TechCreateDto dto) {
        Tech tech = new Tech();
        tech.setName(dto.name());
        dto.id().ifPresent(id -> tech.setId(id));
        return tech;
    }

    public Tech toEntity(TechDto dto) {
        Tech tech = new Tech();
        tech.setName(dto.name());
        tech.setId(dto.id());
        return tech;
    }

    public TechDto toDto(Tech tech) {
        return new TechDto(tech.getId(), tech.getName());
    }

    public List<TechDto> toAllDto(List<Tech> tech) {
        return tech
            .stream()
            .map(t -> toDto(t))
            .collect(Collectors.toList());
    }
}
