package com.jobhunter.backend.dto;

import java.time.LocalDate;
import java.util.Set;

public record CandidDto(
                Integer id,
                String title,
                CityDto cityDto,
                WebsiteDto websiteDto,
                String url,
                String company,
                Set<TechDto> stack,
                Boolean unsolicited,
                Boolean answer,
                // ContractType contractType
                // Position position
                LocalDate addDate) {
}
