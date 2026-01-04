package com.jobhunter.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.dto.CandidCreateDto;

import com.jobhunter.backend.mapper.CandidMapper;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.service.CandidService;
import com.jobhunter.backend.service.CityService;
import com.jobhunter.backend.service.TechService;
import com.jobhunter.backend.service.WebsiteService;

@RestController
@RequestMapping("/candid")
// @CrossOrigin(originPatterns = "*")
public class CandidController {

  @Autowired
  private CandidService candidService;
  @Autowired
  private WebsiteService websiteService;
  @Autowired
  private CityService cityService;
  @Autowired
  private TechService techService;

  @Autowired
  private CandidMapper candidMapper;

  @GetMapping
  public List<CandidDto> findAll(
      @RequestParam(name = "city_name", required = false) String cityName,
      @RequestParam(name = "website_name", required = false) String websiteName) {
    if (cityName != null && websiteName == null)
      return candidService.findAllByCityName(cityName);
    else if (cityName == null && websiteName != null)
      return candidService.findAllByWebsiteName(websiteName);
    else if (cityName != null && websiteName != null)
      return candidService.findAllByCityNameAndWebsiteName(cityName, websiteName);
    else
      return candidMapper.toAllDto(candidService.findAll());
  }

  @DeleteMapping("/{id}")
  public Integer deleteById(
      @PathVariable Integer id) {
    candidService.deletebyId(id);
    return id;
  }

  @GetMapping("/{id}")
  public CandidDto findById(
      @PathVariable Integer id) {
    return candidService.findById(id);
  }

  // When i comment this methods, app doesn't compilte right
  @PostMapping
  public void createNewCandid(
      @RequestBody CandidCreateDto createDto) {

    Candid candid = new Candid();

    // set the inside fields
    candid.setTitle(createDto.title());
    candid.setUrl(createDto.url());
    candid.setUnsolicited(createDto.unsolicited());
    candid.setTechOffer(createDto.techOffer());
    candid.setAnswer(createDto.answer());

    // return new CandidDto();

    // it's on the service to create and handle domain logic
    //
    //
    // Candid candid = candidMapper.toEntity(dto);
    // candidDTO resultDto = candidService.save(candid); (optional)
    // return designerDTO

    // Candid candid = new Candid();

    // candid.setTitle(dto.title());
    // candid.setUrl(dto.url());
    // FIX:
    // candid.setCompany(dto.company());

    // candid.setUnsolicited(dto.unsolicited());
    // candid.setAnswer(dto.answer());
    //
    // City city = cityService.findOrCreateByName(dto.cityDto().name());
    // candid.setCity(city);
    //
    // Website website = websiteService.findOrCreateByName(dto.websiteDto().name());
    // candid.setWebsite(website);

    // FIX:
    // dto.stack().forEach(techItem -> {
    // Tech tech = techService.findOrCreateByName(techItem.name());
    // candid.addTech(tech);
    // });

    // LocalDate date = LocalDate.now();
    // candid.setDateApply(date);
    //
    // candidService.save(candid);
    //
    // dto.stack().forEach(techItem -> {
    // Tech tech = techService.findOrCreateByName(techItem.name());
    // tech.addCandid(candid);
    // });
    // return dto;
  }
}
