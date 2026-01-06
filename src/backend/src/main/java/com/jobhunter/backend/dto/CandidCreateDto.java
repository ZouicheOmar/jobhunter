package com.jobhunter.backend.dto;

import java.util.List;

public record CandidCreateDto(
    String url,
    String title,
    Boolean unsolicited,
    Boolean techOffer,
    Boolean answer,
    String dateApply,
    CompanyCreateDto company,
    CityDto city,
    WebsiteCreateDto website,
    ContractCreateDto contract,
    List<TechCreateDto> stack
) {}
