package com.jobhunter.backend.mapper;

import com.jobhunter.backend.dto.CompanyCreateDto;
import com.jobhunter.backend.dto.CompanyDto;
import com.jobhunter.backend.model.Company;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class CompanyMapper {

	public static Company toEntity(CompanyDto dto) {
		Company cp = new Company();
		cp.setId(dto.id());
		cp.setName(dto.name());
		return cp;
	}

	public static Company createToEntity(CompanyCreateDto cdto) {
		Company cp = new Company();
		// cdto.id().ifPresent(id -> cp.setId(id));
		cp.setName(cdto.name());
		return cp;
	}

	public static CompanyDto toDto(Company cp) {
		return new CompanyDto(cp.getId(), cp.getName());
	}

	public static List<CompanyDto> toAllDto(List<Company> cps) {
		return cps.stream().map(cp -> toDto(cp)).collect(Collectors.toList());
	}

	public static List<CompanyDto> toAllDtoReversed(List<Company> cps) {
		List<CompanyDto> l = cps.stream().map(cp -> toDto(cp)).collect(Collectors.toList());
		Collections.reverse(l);
		return l;
	}

	public static CompanyDto stoDto(Company cp) {
		return new CompanyDto(cp.getId(), cp.getName());
	}

}
