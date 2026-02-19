package com.jobhunter.backend.controller;

import com.jobhunter.backend.dto.TechCreateDto;
import com.jobhunter.backend.dto.TechDto;
import com.jobhunter.backend.mapper.TechMapper;
import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.service.TechService;

import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tech")
@Slf4j
public class TechController {

        @Autowired
        private TechService techService;

        @GetMapping
        public List<TechDto> findAllByName(
                        @RequestParam String[] names) {
                List<String> ns = Arrays.asList(names);
                return TechMapper.toAllDto(techService.findAllByNames(ns));
        }

        @PostMapping
        public ResponseEntity<?> create(
                        @RequestBody TechCreateDto dto) {
                Tech tech = TechMapper.createToEntity(dto);
                Tech savedTech = techService.save(tech);
                return savedTech == null
                                ? ResponseEntity.badRequest().build()
                                : ResponseEntity.ok("----- CREATED : " + dto.name() + "\n");
        }

        @PostMapping("/multi")
        public ResponseEntity<?> createMulti(
                        @RequestBody List<TechCreateDto> dtos) {
                List<Tech> stack = TechMapper.createToAllDto(dtos);
                Integer numSaved = techService.saveAll(stack);
                if (numSaved == null)
                        return ResponseEntity.badRequest().build();
                else if (numSaved == dtos.size())
                        return ResponseEntity.ok("----- SAVED ALL : " + numSaved + "\n");
                else if (numSaved < dtos.size())
                        return ResponseEntity.ok("----- SAVED SOME : " + numSaved + "/" + dtos.size() + "\n");
                else if (numSaved == 0)
                        return ResponseEntity.badRequest().build();
                return ResponseEntity.badRequest().build();
        }
}
