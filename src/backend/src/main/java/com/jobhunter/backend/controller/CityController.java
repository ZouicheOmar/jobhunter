package com.jobhunter.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.model.City;
import com.jobhunter.backend.service.CityService;

@RestController
@RequestMapping("/city")
public class CityController {

  private final CityService cityService;

  public CityController(CityService cityService) {
    this.cityService = cityService;
  }

  @GetMapping
  public List<City> findAll() {
    return cityService.findAll();
  }

  @PostMapping
  public String createNewCity(
      @RequestBody City city) {
    System.out.print("city------------------------------");
    System.out.print(city);
    System.out.print("----------------------------------");
    var r = cityService.save(city);
    return r;
  }
}
