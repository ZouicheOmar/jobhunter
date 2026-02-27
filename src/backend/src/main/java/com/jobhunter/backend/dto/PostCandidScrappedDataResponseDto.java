package com.jobhunter.backend.dto;

public record PostCandidScrappedDataResponseDto
(
 String title,
 ContractLooseDto contract,
 WebsiteDto website,
 CompanyDto company,
 CityDto city
 ) {
}
