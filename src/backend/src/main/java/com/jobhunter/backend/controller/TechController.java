package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.TechDto;
import com.jobhunter.backend.mapper.TechMapper;
import com.jobhunter.backend.service.TechService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tech")
public class TechController {

    @Autowired
    private TechService techService;

    // http://localhost:8000/tech?names=name_1, name_2,name_3
    @GetMapping
    public List<TechDto> findAllByName(
            @RequestParam String[] names) {
        List<String> ns = Arrays.asList(names);
        System.out.println(names);
        System.out.print(ns);
        return TechMapper.toAllDto(techService.findAllByNames(ns));
    }
}
