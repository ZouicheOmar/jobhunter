package com.jobhunter.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.dto.CityDto;
import com.jobhunter.backend.dto.WebsiteDto;
import com.jobhunter.backend.mapper.CityMapper;
import com.jobhunter.backend.mapper.WebsiteMapper;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.service.CityService;
import com.jobhunter.backend.service.WebsiteService;

@RestController
@RequestMapping("/completion")
@CrossOrigin
public class CompletionController {
  @Autowired
  private CityService cityService;

  @Autowired
  private CityMapper cityMapper;

  @Autowired
  private WebsiteMapper websiteMapper;

  @Autowired
  private WebsiteService websiteService;

  @GetMapping("/city")
  public List<CityDto> ListByCityName(@RequestParam String value) {
    List<City> query;

    if (value.matches("\\d+"))
      query = cityService.findAllByZipcodeContaining(value);
    else
      query = cityService.findAllByNameContaining(value);

    return cityMapper.toAllDto(query);
  }

  @GetMapping("/website")
  public List<WebsiteDto> ListByWebsiteName(@RequestParam String value) {
    List<Website> query = websiteService.findAllByNameContaining(value);
    return websiteMapper.toAllDto(query);
  }
}
