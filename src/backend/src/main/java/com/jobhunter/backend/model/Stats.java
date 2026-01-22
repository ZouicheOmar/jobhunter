package com.jobhunter.backend.model;

import java.util.List;

import com.jobhunter.backend.dto.CandidPerCityDto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
public class Stats {
    private Long numCandids;
    private Long numUnsolicited;
    private Candid lastCandid;
    private List<CandidPerCityDto> TopCities;
    // private List<Tech> TopTechs;
}
