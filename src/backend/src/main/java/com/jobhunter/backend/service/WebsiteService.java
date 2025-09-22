package com.jobhunter.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.repository.WebsiteRepository;

@Service
public class WebsiteService {

  private final WebsiteRepository websiteRepository;

  public WebsiteService(WebsiteRepository websiteRepository) {
    this.websiteRepository = websiteRepository;
  }

  public String save(Website website) {
    websiteRepository.save(website);
    return "website saved";
  }

  public List<Website> findAll() {
    return websiteRepository.findAll();
  }

  public Website findOrCreateByName(String name) {
    Website website = websiteRepository.findByName(name);
    if (website == null) {
      Website websiteToAdd = new Website();
      websiteToAdd.setName(name);
      websiteRepository.save(websiteToAdd);
      return websiteToAdd;
    }
    return website;
  }

}
