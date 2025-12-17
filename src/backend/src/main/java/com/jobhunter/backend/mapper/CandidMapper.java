package com.jobhunter.backend.mapper;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.service.CityService;
import com.jobhunter.backend.service.TechService;
import com.jobhunter.backend.service.WebsiteService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class CandidMapper {

  private final Mapper mapper;
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

    candid.setTitle(dto.title());
    candid.setUrl(dto.url());
    candid.setUnsolicited(dto.unsolicited());
    candid.setAnswer(dto.answer());
    candid.setStack(techMapper.toAllEntity(dto.stack()));

    // City cityEntity = cityMapper.toEntity(dto.cityDto());

    City city = cityService.findOrCreateByName(dto.cityDto().name());
    candid.setCity(city);

    candid.setWebsite(websiteMapper.toEntity(dto.websiteDto()));
    // setCompany(new Company(dto.company()))
    candid.setCompany(dto.company());
    candid.setAddDate(dto.addDate());

    return candid;
  }

  // should probably define multiple dtos according to use
  // for example: CreateCandidDto
  // getBriefCandidDto;
  // getFullCandidDto;
  // updateCandidDto;
  public CandidDto toDto(Candid candid) {
    var comp = candid.getCompany() != null ? candid.getCompany().getName() : null;
    return new CandidDto(candid.getId(), candid.getTitle(), candid.getUrl(), comp,
        candid.getUnsolicited(), candid.getAnswer(), candid.getAddDate(),
        websiteMapper.toDto(candid.getWebsite()),
        techMapper.toAllDto(candid.getStack()),
        cityMapper.toDto(candid.getCity()));
  }
}
