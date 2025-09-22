package com.jobhunter.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.service.WebsiteService;

@RestController
@RequestMapping("/website")
public class WebsiteController {

  private final WebsiteService websiteService;

  public WebsiteController(WebsiteService websiteService) {
    this.websiteService = websiteService;
  }

  @GetMapping
  public List<Website> findAll() {
    return websiteService.findAll();
  }

  @PostMapping
  public String createNewwebsite(
      @RequestBody Website website) {
    var r = websiteService.save(website);
    return r;
  }
}
