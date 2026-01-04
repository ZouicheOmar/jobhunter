package com.jobhunter.backend.mapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.CompanyDto;
import com.jobhunter.backend.model.Company;

@Component
public class CompanyMapper {

  public CompanyDto toDto(Company company) {
    return new CompanyDto(company.getName());
  }

  public List<CompanyDto> toAllDto(List<Company> tech) {
    return tech.stream().map(t -> toDto(t)).collect(Collectors.toList());
  }

}
