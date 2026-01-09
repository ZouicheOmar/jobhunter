package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.mapper.CityMapper;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.service.CityService;
import jakarta.persistence.EntityNotFoundException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
    public CityDto findByNameOrZipcode(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) Integer zipcode
    ) {
        City city;
        if (zipcode != null) {
            try {
                city = cityService.findByZipcode(zipcode);
                return CityMapper.toDto(city);
            } catch (EntityNotFoundException e) {
                throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "City Not Found"
                );
            }
        } else {
            try {
                city = cityService.findByName(name);
                return CityMapper.toDto(city);
            } catch (EntityNotFoundException e) {
                throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "City Not Found"
                );
            }
        }
    }
}
