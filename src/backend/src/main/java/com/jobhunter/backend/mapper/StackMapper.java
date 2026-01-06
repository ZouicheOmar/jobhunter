package com.jobhunter.backend.mapper;

import com.jobhunter.backend.dto.TechCreateDto;
import com.jobhunter.backend.dto.TechDto;
import com.jobhunter.backend.model.Tech;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StackMapper {

    @Autowired
    TechMapper techMapper;

    public List<TechDto> toDto(List<Tech> stack) {
        return stack
            .stream()
            .map(tech -> techMapper.toDto(tech))
            .toList();
    }

    public List<Tech> createToEntity(List<TechCreateDto> cdto) {
        return cdto
            .stream()
            .map(dto -> techMapper.createToEntity(dto))
            .toList();
    }

    public List<Tech> toEntity(List<TechDto> stackDto) {
        return stackDto
            .stream()
            .map(dto -> techMapper.toEntity(dto))
            .toList();
    }
}
