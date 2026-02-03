package com.jobhunter.backend.controller.candid;

import com.jobhunter.backend.dto.CandidCreateDto;
import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.mapper.CandidMapper;
import com.jobhunter.backend.model.Candid;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CandidCreateController extends CandidBaseController {

    @PostMapping
    public CandidDto createNewCandid(@RequestBody CandidCreateDto createDto) {
        Candid candid = CandidMapper.createToEntity(createDto);
        return CandidMapper.toDto(candidService.create(candid));
    }
}
