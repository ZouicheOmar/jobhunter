package com.jobhunter.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.jobhunter.backend.dto.TechDto;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.repository.TechRepository;

@Service
public class TechService {

  private final TechRepository techRepository;
  private final TechMapper techMapper;

  public TechService(TechRepository techRepository, TechMapper techMapper) {
    this.techRepository = techRepository;
    this.techMapper = techMapper;
  }

  public TechDto save(Tech tech) {
    return techMapper.toDto(techRepository.save(tech));
  }

  public List<TechDto> findAll() {
    return techRepository.findAll().stream().map(tech -> techMapper.toDto(tech)).collect(Collectors.toList());
  }

  public List<Tech> findAllEntities() {
    return techRepository.findAll();
  }

  public Tech findOrCreateByName(String name) {
    Tech techQuery = techRepository.findByName(name);

    if (techQuery != null)
      return techQuery;

    Tech tech = new Tech();
    tech.setName(name);
    return techRepository.save(tech);
  }

  public void updateTech(Tech tech) {
    techRepository.save(tech);
  }

}
