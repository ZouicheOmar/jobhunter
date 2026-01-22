package com.jobhunter.backend.service;

import com.jobhunter.backend.dto.CandidPerCityDto;
import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.interfaces.ICityCount;
import com.jobhunter.backend.mapper.CityMapper;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.Stats;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.model.Company;
import com.jobhunter.backend.model.Contract;
import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.repository.CandidRepository;
import com.jobhunter.backend.repository.CityRepository;
import com.jobhunter.backend.repository.TechRepository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class StatsService {

    @Autowired
    private CandidRepository candidRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private StackService stackService;

    @Autowired
    private CityService cityService;

    @Autowired
    private WebsiteService websiteService;

    @Autowired
    private ContractService contractService;

    @Autowired
    CityRepository cityRepository;

    @Autowired
    TechRepository techRepository;

    public Stats get(){
        Stats s = new Stats();

        Long numCandids = candidRepository.count();
        s.setNumCandids(numCandids);

        Long numUnsolicited = candidRepository.countCandidByUnsolicited();
        s.setNumUnsolicited(numUnsolicited);

        Candid lastCandid = candidRepository.findFirstByOrderByDateApplyDesc();
        s.setLastCandid(lastCandid);


        List<ICityCount> topCities = candidRepository.countCandidByCityNative();
        List<CandidPerCityDto> cities = new ArrayList<CandidPerCityDto>();
        topCities.forEach( tc -> { 
            City c = cityService.findById(tc.getCityCandidId());
            cities.add(new CandidPerCityDto(tc.getTotalCandid(), CityMapper.toDto(c)));
        });

        s.setTopCities(cities);


        // List<Tech> topTech = techRepository.findAll();
        // build object 
        return s;
    }
}
