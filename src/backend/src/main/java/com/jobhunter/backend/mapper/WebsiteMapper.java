package com.jobhunter.backend.mapper;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.WebsiteDto;
import com.jobhunter.backend.model.Website;

@Component
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
