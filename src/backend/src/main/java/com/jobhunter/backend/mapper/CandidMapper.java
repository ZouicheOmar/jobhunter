package com.jobhunter.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.service.CityService;
import com.jobhunter.backend.service.TechService;
import com.jobhunter.backend.service.WebsiteService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

// NOTE Doesn't work when annotated as @Component
// makes candid methods unavailable
@Component
public class CandidMapper {

  private final CityMapper cityMapper;
  private final WebsiteMapper websiteMapper;
  private final TechMapper techMapper;

  private final CityService cityService;
  private final TechService techService;
  private final WebsiteService websiteService;

  public CandidMapper(CityMapper cityMapper, WebsiteMapper websiteMapper, TechMapper techMapper,
      CityService cityService, TechService techService, WebsiteService websiteService, EntityManager em) {
    this.cityMapper = cityMapper;
    this.websiteMapper = websiteMapper;
    this.techMapper = techMapper;
    this.cityService = cityService;
    this.techService = techService;
    this.websiteService = websiteService;
    this.em = em; // pas sûr de ça
  }

  @PersistenceContext
  private EntityManager em;

  public Candid toEntity(CandidDto dto) {
    var candid = new Candid();
    return candid;

    // candid.setTitle(dto.title());
    // candid.setUrl(dto.url());
    // candid.setUnsolicited(dto.unsolicited());
    // candid.setAnswer(dto.answer());
    // candid.setStack(techMapper.toAllEntity(dto.stack()));
    // City city = cityService.findOrCreateByName(dto.cityDto().name());
    // candid.setCity(city);
    // candid.setWebsite(websiteMapper.toEntity(dto.websiteDto()));
    // candid.setDateApply(dto.dateApply());
  }

  public List<String> getTechList(Candid candid) {
    return candid.getStack().stream()
        .map((tech) -> tech.getName()).collect(Collectors.toList());
  }

  // should probably define multiple dtos according to use
  // for example: CreateCandidDto
  // getBriefCandidDto;
  // getFullCandidDto;
  // updateCandidDto;

  public CandidDto toDto(Candid candid) {
    return new CandidDto(
        candid.getId(),
        candid.getTitle(),
        candid.getUrl(),
        candid.getCompany().getName(),
        candid.getDateApply().toString(),
        candid.getUnsolicited(),
        candid.getAnswer(),
        getTechList(candid),
        candid.getCity().getName());
  }

  public List<CandidDto> toAllDto(List<Candid> candids) {
    return candids.stream()
        .map((candid) -> toDto(candid))
        .collect(Collectors.toList());
    // .map((candid) -> new CandidDto(
    // candid.getId(),
    // candid.getTitle(),
    // candid.getUrl(),
    // candid.getCompany().getName(),
    // candid.getUnsolicited(),
    // candid.getAnswer(),
    // getTechList(candid),
    // candid.getCity().getName()))
    // .collect(Collectors.toList());
  }
}
