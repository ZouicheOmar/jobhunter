package com.jobhunter.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.service.CityService;

@RestController
@RequestMapping("/city")
@CrossOrigin
public class CityController {

  @Autowired
  private CityService cityService;

  @GetMapping
  public List<CityDto> findAll() {
    return cityService.findAll();
  }

  @PostMapping
  public CityDto createNewCity(
      @RequestBody City city) {
    System.out.print("city------------------------------");
    System.out.print(city);
    System.out.print("----------------------------------");
    return cityService.save(city);
  }
}
