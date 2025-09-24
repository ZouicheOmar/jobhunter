package com.jobhunter.backend.service;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.model.Candid;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class CandidMapper {

  private final CityMapper cityMapper;
  private final WebsiteMapper websiteMapper;
  private final TechMapper techMapper;

  @PersistenceContext
  private EntityManager em;

  public CandidMapper(CityMapper cityMapper, WebsiteMapper websiteMapper, TechMapper techMapper) {
    this.cityMapper = cityMapper;
    this.websiteMapper = websiteMapper;
    this.techMapper = techMapper;
  }

  public Candid toEntity(CandidDto dto) {
    var candid = new Candid();

    candid.setTitle(dto.title());
    candid.setUrl(dto.url());
    candid.setUnsolicited(dto.unsolicited());
    candid.setAnswer(dto.answer());
    candid.setStack(techMapper.toAllEntity(dto.stack()));
    candid.setCity(cityMapper.toEntity(dto.cityDto()));
    candid.setWebsite(websiteMapper.toEntity(dto.websiteDto()));
    candid.setCompany(dto.company());
    candid.setAddDate(dto.addDate());

    return candid;
  }

  public CandidDto toDto(Candid candid) {
    return new CandidDto(
        candid.getId(),
        candid.getTitle(),
        cityMapper.toDto(candid.getCity()),
        websiteMapper.toDto(candid.getWebsite()),
        candid.getUrl(),
        candid.getCompany(),
        techMapper.toAllDto(candid.getStack()),
        candid.getUnsolicited(),
        candid.getAnswer(),
        candid.getAddDate());
  }
}
