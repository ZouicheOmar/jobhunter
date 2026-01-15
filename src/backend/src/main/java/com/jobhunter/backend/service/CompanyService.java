package com.jobhunter.backend.service;

import com.jobhunter.backend.dto.CompanyCreateDto;
import com.jobhunter.backend.model.Company;
import com.jobhunter.backend.repository.CompanyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	public Company findOrCreate(Company cp) {
		return companyRepository
				.findByName(cp.getName())
				.orElseGet(() -> save(cp));
	}

	public Company findById(Integer id) {
		return companyRepository.findById(id).orElseGet(() -> null);
	}

	public Company findOrCreateByName(String name) {
		return companyRepository
				.findByName(name)
				.orElseGet(() -> save(new Company(name)));
	}

	public List<Company> findAllByNameContaining(String companyName) {
		return companyRepository.findAllByNameContaining(
				companyName,
				Limit.of(4));
	}

	public Page<Company> findAllPageable(Pageable paging) {
		return companyRepository.findAll(paging);
	}

	public List<Company> findAllCompaniesByDateApply() {
		return companyRepository.findAllOrderByCandidDateApply();
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
