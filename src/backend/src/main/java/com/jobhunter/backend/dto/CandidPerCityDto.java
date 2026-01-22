package com.jobhunter.backend.dto;

import com.jobhunter.backend.interfaces.ICityCount;

import java.util.List;

public record CandidPerCityDto(
        Long numCandids,
        CityDto city) {
}
