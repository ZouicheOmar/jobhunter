package com.jobhunter.backend.dto;

import com.jobhunter.backend.interfaces.ICityCount;

import java.util.List;

public record StatsDto(
                Long numCandids,
                Long numUnsolicited,
                CandidDto lastCandid,
                List<CandidPerCityDto> topCities) {
}

// List<TopTech> topCities,
//
