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

    public static List<TechDto> toDto(List<Tech> stack) {
        return stack.stream().map(TechMapper::toDto).toList();
    }

    public static List<Tech> createToEntity(List<TechCreateDto> cdto) {
        return cdto.stream().map(TechMapper::createToEntity).toList();
    }

    public static List<Tech> toEntity(List<TechDto> stackDto) {
        return stackDto.stream().map(TechMapper::toEntity).toList();
    }
}
