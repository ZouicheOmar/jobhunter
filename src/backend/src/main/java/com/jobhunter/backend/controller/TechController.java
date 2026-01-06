package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.TechDto;
import com.jobhunter.backend.mapper.TechMapper;
import com.jobhunter.backend.service.TechService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tech")
public class TechController {

    @Autowired
    private TechService techService;

    @Autowired
    private TechMapper techMapper;

    @GetMapping
    public List<TechDto> findAll() {
        return techMapper.toAllDto(techService.findAll());
    }
}
