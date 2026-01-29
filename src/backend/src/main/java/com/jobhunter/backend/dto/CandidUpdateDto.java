package com.jobhunter.backend.dto;

import java.util.List;
import java.util.Optional;

public record CandidUpdateDto(
    Integer id,
    Optional<String> url,
    Optional<String> title,
    Optional<Boolean> unsolicited,
    Optional<Boolean> techOffer,
    Optional<Boolean> answer,
    Optional<String> dateApply,
    Optional<CompanyCreateDto> company,
    Optional<CityDto> city,
    Optional<WebsiteCreateDto> website,
    Optional<ContractCreateDto> contract,
    Optional<List<TechCreateDto>> stack
) {}
