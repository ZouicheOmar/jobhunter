package com.jobhunter.backend.service;

import com.jobhunter.backend.model.City;
import com.jobhunter.backend.repository.CityRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    public City findById(Integer id) {
        return cityRepository
            .findById(id)
            // SMELLY
            .orElseGet(() -> findByName("remote"));
    }

    public City findByName(String cityName) {
        return cityRepository.findByName(cityName);
    }

    public City findByZipcode(String zipcodeStr) {
        return cityRepository.findByZipcode(Integer.parseInt(zipcodeStr));
    }

    public List<City> findAllByNameContaining(String cityName) {
        return cityRepository.findAllByNameContaining(cityName, Limit.of(4));
    }

    public List<City> findAllByZipcodeContaining(String zipcodeStr) {
        return cityRepository.findAllByZipcodeContaining(zipcodeStr);
    }
}
