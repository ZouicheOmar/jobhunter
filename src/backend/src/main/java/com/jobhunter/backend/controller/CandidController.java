package com.jobhunter.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.service.CandidService;
import com.jobhunter.backend.service.LogFileHandlerService;

@RestController
@RequestMapping("/candid")
public class CandidController {

  private final CandidService candidService;
  private final LogFileHandlerService logFileHandlerService;

  public CandidController(CandidService candidService, LogFileHandlerService logFileHandlerService) {
    this.candidService = candidService;
    this.logFileHandlerService = logFileHandlerService;
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

  @GetMapping("/{candidId}")
  public CandidDto findById(
      @PathVariable Integer candidId) {
    return candidService.findById(candidId);
  }

  @PostMapping
  public CandidDto createNewCandid(
      @RequestBody CandidDto candid) {
    return candidService.save(candid);
  }

  @GetMapping("/handleFile")
  public String handleFile() {
    logFileHandlerService.handleFile();
    return "supposed to be handling file now";
  }
}
