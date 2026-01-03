package com.jobhunter.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.jobhunter.backend.dto.WebsiteDto;
import com.jobhunter.backend.model.Website;

@Component
public class WebsiteMapper {

  public Website toEntity(WebsiteDto dto) {
    var website = new Website();
    website.setName(dto.name());
    return website;
  }

  public WebsiteDto toDto(Website website) {
    return new WebsiteDto(website.getName());
  }

  public List<WebsiteDto> toAllDto(List<Website> websites) {
    return websites.stream().map((website) -> toDto(website))
        .collect(Collectors.toList());
  }

}
