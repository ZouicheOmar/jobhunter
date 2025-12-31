package com.jobhunter.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.mapper.CandidMapper;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.repository.CandidRepository;

@Service
public class CandidService {

  private final CandidMapper candidMapper;
  private final CandidRepository candidRepository;

  private final CityService cityService;
  private final TechService techService;
  private final WebsiteService websiteService;

  public CandidService(CandidMapper candidMapper, CandidRepository candidRepository, CityService cityService,
      TechService techService, WebsiteService websiteService) {
    this.candidMapper = candidMapper;
    this.candidRepository = candidRepository;
    this.cityService = cityService;
    this.techService = techService;
    this.websiteService = websiteService;
  }

  public List<Candid> findAll() {
    return candidRepository.findAll();
  }

  // public List<CandidDto> findAll() {
  // return candidRepository.findAll()
  // .stream()
  // .map(candid -> candidMapper.toDto(candid))
  // .collect(Collectors.toList());
  // }

  public CandidDto findById(Integer id) {
    Candid c = candidRepository.findById(id).get();
    if (c == null) {
      return null;
    }
    return candidMapper.toDto(c);
  }

  public List<CandidDto> findAllByCityName(String cityName) {
    return candidRepository.findAllByCityName(cityName)
        .stream()
        .map(candid -> candidMapper.toDto(candid))
        .collect(Collectors.toList());
  }

  public List<CandidDto> findAllByWebsiteName(String websiteName) {
    return candidRepository.findAllByWebsiteName(websiteName)
        .stream()
        .map(candid -> candidMapper.toDto(candid))
        .collect(Collectors.toList());
  }

  public List<CandidDto> findAllByCityNameAndWebsiteName(String cityName, String websiteName) {
    return candidRepository.findAllByCityNameAndWebsiteName(cityName, websiteName)
        .stream()
        .map(candid -> candidMapper.toDto(candid))
        .collect(Collectors.toList());
  }

  public CandidDto save(CandidDto dto) {
    var candid = candidMapper.toEntity(dto);

    City city = cityService.findOrCreateByName(dto.cityDto().name());
    candid.setCity(city);

    candidRepository.save(candid);
    return dto; // pourquoi ???
    // return candidMapper.toDto(candid);
  }

  // Because I get a candid create dto and return a cadidDto
  // public CandidDto save(CandidCreateDto dto) {
  public Candid save(Candid candid) {
    return candidRepository.save(candid);
  }

  public String saveAll(ArrayList<Candid> candids) {
    candidRepository.saveAll(candids);
    return "probably saved";
  }

  public void deletebyId(Integer id) {
    candidRepository.deleteById(id);
    return;
  }

}
