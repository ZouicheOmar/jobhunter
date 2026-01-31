package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.CandidCreateDto;
import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.dto.CandidUpdateDto;
import com.jobhunter.backend.mapper.CandidMapper;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.service.CandidService;
import com.jobhunter.backend.util.CandidPagination;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

    @GetMapping
    public List<CandidDto> findAll(
            @RequestParam(name = "city_name", required = false) String cityName,
            @RequestParam(name = "website_name", required = false) String websiteName) {
        List<Candid> candids;
        if (cityName != null && websiteName == null) {
            candids = findAllByCityName(cityName);
        } else if (cityName == null && websiteName != null) {
            candids = findAllByWebsiteName(websiteName);
        } else if (cityName != null && websiteName != null) {
            candids = findAllByCityNameAndWebsiteName(cityName, websiteName);
        } else {
            candids = candidService.findAll();
        }
        return CandidMapper.toAllDto(candids);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Integer> updateCandid(
            @PathVariable Integer id,
            @RequestBody CandidUpdateDto udto) {

        Integer recordsUpdated = candidService.update(udto);
        return ResponseEntity.ok(recordsUpdated);
    }

    private List<Candid> findAllByCityNameAndWebsiteName(
            String cityName,
            String websiteName) {
        return candidService.findAllByCityNameAndWebsiteName(
                cityName,
                websiteName);
    }

    private List<Candid> findAllByCityName(String cityName) {
        return candidService.findAllByCityName(cityName);
    }

    private List<Candid> findAllByWebsiteName(String websiteName) {
        return candidService.findAllByWebsiteName(websiteName);
    }

    @GetMapping("/candids")
    public PagedModel<CandidDto> findAllPaged(
            @RequestParam(defaultValue = "0") int page, // guessing pages are 0 indexed
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = CandidPagination.pageByDateApply(page, size);
        Page<Candid> candids = candidService.findAllPageable(pageable);
        Page<CandidDto> dtos = candids.map(CandidMapper::toDto);
        return new PagedModel<CandidDto>(dtos);
    }

    @GetMapping("/{id}")
    public CandidDto findById(@PathVariable Integer id) {
        return CandidMapper.toDto(candidService.findById(id));
    }

    @PostMapping
    public CandidDto createNewCandid(@RequestBody CandidCreateDto createDto) {
        Candid candid = CandidMapper.createToEntity(createDto);
        return CandidMapper.toDto(candidService.create(candid));
    }
}
