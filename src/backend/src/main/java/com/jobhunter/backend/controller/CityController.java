package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.mapper.CityMapper;
import com.jobhunter.backend.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping("/{id}")
    public CityDto findById(@PathVariable Integer id) {
        return CityMapper.toDto(cityService.findById(id));
    }

    @GetMapping
    public CityDto findByName(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String zipcode
    ) {
        if (zipcode == null) {
            return CityMapper.toDto(cityService.findByName(name));
        } else {
            return CityMapper.toDto(cityService.findByZipcode(zipcode));
        }
    }
}
