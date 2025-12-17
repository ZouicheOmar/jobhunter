package com.jobhunter.backend.mapper;

public class Mapper {

  public final CityMapper cityMapper;
  public final WebsiteMapper websiteMapper;
  public final TechMapper techMapper;

  public Mapper(CityMapper cityMapper, WebsiteMapper websiteMapper, TechMapper techMapper) {
    this.cityMapper = cityMapper;
    this.websiteMapper = websiteMapper;
    this.techMapper = techMapper;
  }
}
