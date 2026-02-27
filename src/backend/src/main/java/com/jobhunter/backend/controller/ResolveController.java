package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.ContractLooseDto;
import com.jobhunter.backend.dto.PostCandidScrappedDataDto;
import com.jobhunter.backend.dto.PostCandidScrappedDataResponseDto;
import com.jobhunter.backend.dto.ResolvePostCandidDataRequest;
import com.jobhunter.backend.mapper.CityMapper;
import com.jobhunter.backend.mapper.CompanyMapper;
import com.jobhunter.backend.mapper.WebsiteMapper;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.model.Company;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.service.CityService;
import com.jobhunter.backend.service.CompanyService;
import com.jobhunter.backend.service.WebsiteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/resolve")
public class ResolveController {

	@Autowired
	private WebsiteService websiteService;

	@Autowired
	private CityService cityService;

	@Autowired
	private CompanyService companyService;

	@PostMapping("/post-candid-data")
	public ResponseEntity<PostCandidScrappedDataResponseDto> findAllPaged(
			@RequestBody ResolvePostCandidDataRequest dto) {

		Website website = websiteService.findOrCreateByName(dto.applicationHostname());
		Company cp = companyService.findOrCreateByName(dto.scrapped().hiringOrganization().name());
		City city = cityService.findFromJobLocation(dto.scrapped().jobLocation());

		return ResponseEntity.ok(
				new PostCandidScrappedDataResponseDto(
						dto.scrapped().title(),
						new ContractLooseDto(dto.scrapped().employmentType(), 0),
						WebsiteMapper.toDto(website),
						CompanyMapper.toDto(cp),
						CityMapper.toDto(city)));
	}
}
