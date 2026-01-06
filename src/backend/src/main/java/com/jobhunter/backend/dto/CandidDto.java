package com.jobhunter.backend.dto;

import java.util.List;

public record CandidDto(
    Integer id,
    String url,
    String title,
    Boolean unsolicited,
    Boolean techOffer,
    Boolean answer,
    String dateApply,
    CompanyDto company,
    CityDto city,
    WebsiteDto website,
    ContractDto contract,
    List<TechDto> stack
) {}
