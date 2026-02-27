package com.jobhunter.backend.service;

import com.jobhunter.backend.dto.JobLocationDto;
import com.jobhunter.backend.dto.PostalAddressDto;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.repository.CityRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
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
        return cityRepository.findByName(cityName).get();
    }

    public City findByZipcode(Integer zipcode) {
        // throw exception
        Optional<City> city = cityRepository.findByZipcode(zipcode);
        if (city.isEmpty())
            throw new EntityNotFoundException("City not found");
        else
            return city.get();
    }

    public List<City> findAllByNameContaining(String cityName) {
        return cityRepository.findAllByNameContaining(cityName, Limit.of(4));
    }

    public List<City> findAllByZipcodeContaining(String zipcodeStr) {
        return cityRepository.findAllByZipcodeContaining(zipcodeStr);
    }

    public City findFromJobLocation(JobLocationDto dto) {
        PostalAddressDto addressDto = dto.address();
        Optional<String> zipcode = addressDto.postalCode();
        Optional<String> name = addressDto.addressLocality();

        Optional<City> res = Optional.empty();

        if (zipcode.isPresent())
            res = cityRepository.findByZipcode(Integer.parseInt(zipcode.get()));
        if (res.isEmpty() && name.isPresent())
            res = cityRepository.findByName(name.get().toLowerCase());

        return res.get();

    }
}
