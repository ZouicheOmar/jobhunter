package com.jobhunter.backend.service;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.model.Website;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class CandidMapper {

  @PersistenceContext
  private EntityManager em;

  public Candid toEntity(CandidDto dto) {
    var candid = new Candid();

    candid.setTitle(dto.title());
    candid.setUrl(dto.url());
    candid.setUnsolicited(dto.unsolicited());
    candid.setAnswer(dto.answer());
    candid.setStack(dto.stack());

    var city = em.find(City.class, dto.cityId());
    candid.setCity(city);

    var website = em.find(Website.class, dto.websiteId());
    candid.setWebsite(website);

    return candid;
  }

  public CandidDto toDto(Candid candid) {
    return new CandidDto(
        candid.getTitle(),
        candid.getCity().getId(),
        candid.getWebsite().getId(),
        candid.getUrl().toString(),
        candid.getUnsolicited(),
        candid.getUnsolicited(),
        candid.getStack());
  }
}
