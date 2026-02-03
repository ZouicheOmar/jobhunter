package com.jobhunter.backend.controller.candid;

import com.jobhunter.backend.dto.CandidCreateDto;
import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.dto.CandidUpdateDto;
import com.jobhunter.backend.mapper.CandidMapper;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.service.CandidService;
import com.jobhunter.backend.util.CandidPagination;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CandidGetController extends CandidBaseController  {

    @GetMapping
    public Page<CandidDto> findAllFiltered(
            @RequestParam(name = "tech_id", required = false) Integer techId,
            @RequestParam(name = "city_id", required = false) Integer cityId,
            @RequestParam(name = "company_id", required = false) Integer companyId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size) {
        Pageable pageable = CandidPagination.pageByDateApply(page, size);
        Page<Candid> candids = candidService.findFiltered(techId, cityId, companyId, pageable);
        return candids.map(CandidMapper::toDto);
    }


    @GetMapping("/{id}")
    public CandidDto findById(@PathVariable Integer id) {
        return CandidMapper.toDto(candidService.findById(id));
    }

}
