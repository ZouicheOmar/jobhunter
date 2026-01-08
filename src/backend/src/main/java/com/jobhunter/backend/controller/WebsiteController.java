package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.WebsiteDto;
import com.jobhunter.backend.mapper.WebsiteMapper;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.service.WebsiteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    // @GetMapping
    // public List<Website> findAll() {
    //     return websiteService.findAll();
    // }

    @PostMapping
    public WebsiteDto create(@RequestBody String name) {
        return WebsiteMapper.toDto(websiteService.save(new Website(name)));
    }

    @GetMapping
    public WebsiteDto findByName(@RequestParam String name) {
        return WebsiteMapper.toDto(websiteService.findOrCreateByName(name));
    }
}
