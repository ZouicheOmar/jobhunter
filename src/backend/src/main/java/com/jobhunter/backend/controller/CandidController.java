package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.CandidCreateDto;
import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.mapper.CandidMapper;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.service.CandidService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/candid")
public class CandidController {

    @Autowired
    private CandidService candidService;

    @Autowired
    private CandidMapper candidMapper;

    @GetMapping
    public List<CandidDto> findAll(
        @RequestParam(name = "city_name", required = false) String cityName,
        @RequestParam(
            name = "website_name",
            required = false
        ) String websiteName
    ) {
        List<Candid> candids;
        if (cityName != null && websiteName == null) candids =
            candidService.findAllByCityName(cityName);
        else if (cityName == null && websiteName != null) candids =
            candidService.findAllByWebsiteName(websiteName);
        else if (cityName != null && websiteName != null) candids =
            candidService.findAllByCityNameAndWebsiteName(
                cityName,
                websiteName
            );
        else candids = candidService.findAll();
        return candidMapper.toAllDto(candids);
    }

    @GetMapping("/{id}")
    public CandidDto findById(@PathVariable Integer id) {
        return candidMapper.toDto(candidService.findById(id));
    }

    @PostMapping
    public CandidDto createNewCandid(@RequestBody CandidCreateDto createDto) {
        Candid candid = candidMapper.createToEntity(createDto);
        return candidMapper.toDto(candidService.create(candid));
    }

    // TODO
    // @DeleteMapping("/{id}")
    // public Integer deleteById(@PathVariable Integer id) {
    // candidService.deletebyId(id);
    // return id;
    // }
}
