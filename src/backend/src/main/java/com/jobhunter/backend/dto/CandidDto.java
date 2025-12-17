package com.jobhunter.backend.dto;

import java.time.LocalDate;
import java.util.Set;

public record CandidDto(Integer id, String title, String url, String company, Boolean unsolicited,
                                                                Boolean answer, LocalDate addDate,
                                                                WebsiteDto websiteDto, Set<TechDto> stack,
                                                                CityDto cityDto) {
}
