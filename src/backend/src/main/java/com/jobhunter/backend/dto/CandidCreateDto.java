package com.jobhunter.backend.dto;

import java.util.List;
import java.util.Optional;

public record CandidCreateDto(
    String url,
    String title,
    Boolean unsolicited,
    Boolean techOffer,
    Boolean answer,
    String dateApply,
    CompanyCreateDto company,
    Integer cityId,
    WebsiteCreateDto website,
    ContractCreateDto contract,
    Optional<List<TechCreateDto>> stack
) {}
