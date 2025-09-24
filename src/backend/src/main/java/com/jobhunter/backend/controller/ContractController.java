package com.jobhunter.backend.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.enums.ContractType;

@RestController
@RequestMapping("/contract")
@CrossOrigin
public class ContractController {

  @GetMapping
  public List<ContractType> findAll() {
    return Arrays.asList(ContractType.values());
  }

}
