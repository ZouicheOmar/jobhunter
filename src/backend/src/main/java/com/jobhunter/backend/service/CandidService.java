package com.jobhunter.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.repository.CandidRepository;

@Service
public class CandidService {

  private final CandidMapper candidMapper;
  private final CandidRepository candidRepository;

  public CandidService(CandidMapper candidMapper, CandidRepository candidRepository) {
    this.candidMapper = candidMapper;
    this.candidRepository = candidRepository;
  }

  public List<CandidDto> findAll() {
    return candidRepository.findAll()
        .stream()
        .map(candid -> candidMapper.toDto(candid))
        .collect(Collectors.toList());
  }

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
    candidRepository.save(candid);
    return candidMapper.toDto(candid);
  }

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
