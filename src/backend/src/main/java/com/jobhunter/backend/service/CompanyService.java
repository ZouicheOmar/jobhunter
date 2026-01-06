package com.jobhunter.backend.service;

import com.jobhunter.backend.dto.CompanyCreateDto;
import com.jobhunter.backend.model.Company;
import com.jobhunter.backend.repository.CompanyRepository;
import java.util.List;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    // create always calls save

    public Company save(Company company) {
        return companyRepository.save(company);
    }

    public Company findOrCreateByName(Company cp) {
        return companyRepository
            .findByName(cp.getName())
            .orElseGet(() -> save(cp));
    }

    public List<Company> findAllByNameContaining(String companyName) {
        return companyRepository.findAllByNameContaining(
            companyName,
            Limit.of(4)
        );
    }

    // this method should not exist
    public Company findOrCreateByDto(CompanyCreateDto cdto) {
        return cdto
            .id()
            .map(companyRepository::findById)
            .flatMap(Function.identity())
            .orElseGet(() -> save(new Company(cdto.name())));
    }
}
