package com.jobhunter.backend.mapper;

import com.jobhunter.backend.dto.CompanyCreateDto;
import com.jobhunter.backend.dto.CompanyDto;
import com.jobhunter.backend.model.Company;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class CompanyMapper {

    public Company toEntity(CompanyDto dto) {
        Company cp = new Company();
        cp.setId(dto.id());
        cp.setName(dto.name());
        return cp;
    }

    public Company createToEntity(CompanyCreateDto cdto) {
        Company cp = new Company();
        // cdto.id().ifPresent(id -> cp.setId(id));
        cp.setName(cdto.name());
        return cp;
    }

    public CompanyDto toDto(Company cp) {
        return new CompanyDto(cp.getId(), cp.getName());
    }

    public List<CompanyDto> toAllDto(List<Company> tech) {
        return tech
            .stream()
            .map(t -> toDto(t))
            .toList();
    }
}
