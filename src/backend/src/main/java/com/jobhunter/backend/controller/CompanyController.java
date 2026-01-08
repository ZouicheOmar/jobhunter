package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.CompanyDto;
import com.jobhunter.backend.mapper.CompanyMapper;
import com.jobhunter.backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping
    public CompanyDto findByName(@RequestParam String name) {
        return CompanyMapper.toDto(companyService.findOrCreateByName(name));
    }
}
