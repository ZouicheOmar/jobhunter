package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.dto.CompanyDto;
import com.jobhunter.backend.mapper.CompanyMapper;
import com.jobhunter.backend.model.Company;
import com.jobhunter.backend.service.CompanyService;
import com.jobhunter.backend.util.CompanyPagination;

import jakarta.websocket.server.PathParam;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@GetMapping("/{id}")
	public CompanyDto findById(@PathVariable int id) {
		return CompanyMapper.toDto(companyService.findById(id));
	}

	@GetMapping
	public PagedModel<CompanyDto> findAllFiltered(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(name = "by_date_apply", required = false) Boolean byDateApply) {
		Pageable paging = CompanyPagination.pageByName(page, size);
		Page<Company> companies = companyService.findAllPageable(paging);
		Page<CompanyDto> dtos = companies.map(CompanyMapper::toDto);
		return new PagedModel<CompanyDto>(dtos);
	}

	@GetMapping("/filtered")
	public PagedModel<CompanyDto> findAllPaged(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "20") int size,
			@RequestParam(defaultValue = "true") Boolean orderByDateApply) {

		Pageable paging = CompanyPagination.pageByName(page, size);

		if (orderByDateApply)
			return findAllOrderByDateApplyPage(page, size);

		Page<Company> companies = companyService.findAllPageable(paging);
		Page<CompanyDto> dtos = companies.map(CompanyMapper::toDto);
		return new PagedModel<CompanyDto>(dtos);
	}

	public PagedModel<CompanyDto> findAllOrderByDateApplyPage(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);

		List<CompanyDto> dtos = CompanyMapper.toAllDtoReversed(companyService.findAllCompaniesByDateApply());
		PageImpl<CompanyDto> cpp = new PageImpl<CompanyDto>(dtos);
		return new PagedModel<CompanyDto>(cpp);
	}

}
