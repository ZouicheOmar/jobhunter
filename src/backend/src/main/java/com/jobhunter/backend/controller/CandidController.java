package com.jobhunter.backend.controller;

import java.util.List;

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
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.service.CandidService;
import com.jobhunter.backend.service.CityService;
import com.jobhunter.backend.service.LogFileHandlerService;
import com.jobhunter.backend.service.TechService;
import com.jobhunter.backend.service.WebsiteService;

@RestController
@RequestMapping("/candid")
@CrossOrigin
public class CandidController {

  private final LogFileHandlerService logFileHandlerService;
  private final CandidService candidService;
  private final WebsiteService websiteService;
  private final CityService cityService;
  private final TechService techService;

  public CandidController(LogFileHandlerService logFileHandlerService, CandidService candidService,
      WebsiteService websiteService, CityService cityService, TechService techService) {
    this.logFileHandlerService = logFileHandlerService;
    this.candidService = candidService;
    this.websiteService = websiteService;
    this.cityService = cityService;
    this.techService = techService;
  }

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
      return candidService.findAll();
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

  @PostMapping
  public CandidDto createNewCandid(
      @RequestBody CandidDto dto) {

    Candid candid = new Candid();

    candid.setTitle(dto.title());
    candid.setUrl(dto.url());
    candid.setCompany(dto.company());

    // TODO: add unsolicited on the frontend side
    candid.setUnsolicited(dto.unsolicited());
    candid.setAnswer(dto.answer());

    City city = cityService.findOrCreateByName(dto.cityDto().name());
    candid.setCity(city);

    Website website = websiteService.findOrCreateByName(dto.websiteDto().name());
    candid.setWebsite(website);

    dto.stack().forEach(techItem -> {
      Tech tech = techService.findOrCreateByName(techItem.name());
      candid.addTech(tech);
    });

    candidService.save(candid);

    dto.stack().forEach(techItem -> {
      Tech tech = techService.findOrCreateByName(techItem.name());
      tech.addCandid(candid);
    });
    return dto;
  }

  @GetMapping("/handleFile")
  public String handleFile() {
    logFileHandlerService.handleFile();
    return "supposed to be handling file now";
  }
}
