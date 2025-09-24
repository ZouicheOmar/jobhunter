package com.jobhunter.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.dto.TechDto;
import com.jobhunter.backend.service.TechService;

@RestController
@RequestMapping("/tech")
@CrossOrigin
public class TechController {

  TechService techService;

  public TechController(TechService techService) {
    this.techService = techService;
  }

  @GetMapping
  public List<TechDto> findAll() {
    return techService.findAll();
  }

}
