package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.WebsiteCreateDto;
import com.jobhunter.backend.dto.WebsiteDto;
import com.jobhunter.backend.mapper.WebsiteMapper;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.service.WebsiteService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/website")
public class WebsiteController {

    @Autowired
    private WebsiteService websiteService;

    // je sais pas à quoi correspond un body string name en http ???...
    @PostMapping
    public ResponseEntity<?> create(@RequestBody WebsiteCreateDto dto) {
        Website website = websiteService.save(new Website(dto.name()));
        return website == null
                ? ResponseEntity.badRequest().build()
                : ResponseEntity.ok("----- CREATED WEBSITE : " + website.getName() + "\n");
    }

    @PostMapping("/multi")
    public ResponseEntity<?> create(@RequestBody List<WebsiteCreateDto> dtos) {
        List<Website> websites = WebsiteMapper.createToAllDto(dtos);
        List<Website> savedWebsites = websiteService.saveAll(websites);
        return savedWebsites == null
                ? ResponseEntity.badRequest().build()
                : ResponseEntity.ok("----- CREATED MANY WEBSITE \n");
    }

    @GetMapping
    public WebsiteDto findByName(@RequestParam String name) {
        return WebsiteMapper.toDto(websiteService.findOrCreateByName(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WebsiteDto> findById(@PathVariable Integer id) {
        Optional<Website> website = websiteService.findById(id);
        if (website.isPresent())
            return ResponseEntity.ok(WebsiteMapper.toDto(website.get()));
        else
            return ResponseEntity.noContent().build();
    }
}
