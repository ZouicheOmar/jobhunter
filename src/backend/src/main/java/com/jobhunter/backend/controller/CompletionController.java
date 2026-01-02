package com.jobhunter.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.mapper.CityMapper;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.service.CityService;

@RestController
@RequestMapping("/completion")
@CrossOrigin
public class CompletionController {
  @Autowired
  private CityService cityService;

  @Autowired
  private CityMapper cityMapper;

  @GetMapping("/city")
  public List<CityDto> ListByCityName(@RequestParam String value) {
    // TODO test if value is string or integer (when a zipcode is sent)
    List<City> query = cityService.findAllByNameContaining(value);
    return cityMapper.toAllDto(query);
  }
}
