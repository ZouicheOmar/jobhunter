package com.jobhunter.backend.service;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.WebsiteDto;
import com.jobhunter.backend.model.Website;

@Service
public class WebsiteMapper {

  public Website toEntity(WebsiteDto dto) {
    var website = new Website();
    website.setName(dto.name());
    return website;
  }

  public WebsiteDto toDto(Website city) {
    return new WebsiteDto(city.getName());
  }

}
