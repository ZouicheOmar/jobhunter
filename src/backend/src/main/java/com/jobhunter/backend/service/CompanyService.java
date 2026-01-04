package com.jobhunter.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Limit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.CompanyDto;
import com.jobhunter.backend.mapper.TechMapper;
import com.jobhunter.backend.model.Company;
import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.repository.CompanyRepository;
import com.jobhunter.backend.repository.TechRepository;

@Service
public class CompanyService {

  private CompanyRepository companyRepository;

  public CompanyService(CompanyRepository companyRepository) {
    this.companyRepository = companyRepository;
  }

  // public CompanyDto save(Tech tech) {
  // return companyMapper.toDto(companyRepository.save(tech));
  // }

  public List<Company> findAllByNameContaining(String websiteName) {
    return companyRepository.findAllByNameContaining(websiteName, Limit.of(4));
  }

}
