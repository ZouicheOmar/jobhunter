package com.jobhunter.backend.dto;

public record PostCandidScrappedDataDto
(
 String title,
 String employmentType,
 CompanyCreateDto hiringOrganization,
 JobLocationDto jobLocation
 ) {
}
