package com.jobhunter.backend.controller;

import com.jobhunter.backend.service.CandidService;
import com.jobhunter.backend.util.CandidPagination;

import io.micrometer.core.ipc.http.HttpSender.Response;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.dto.CandidCreateDto;
import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.mapper.CandidMapper;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.DBUser;
import com.jobhunter.backend.repository.DBUserRepository;
import com.jobhunter.backend.security.DBUserDetails;

import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/candids")
public class CandidController {

    @Autowired
    private DBUserRepository userRepo;

    @Autowired
    private CandidService candidService;

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

    @PostMapping
    public ResponseEntity<?> createNewCandid(
            @AuthenticationPrincipal DBUserDetails principal,
            @RequestBody CandidCreateDto createDto) {

        Optional<DBUser> userQuery = userRepo.findById(principal.getId());
        if (userQuery.isEmpty())
            return ResponseEntity.notFound().build();

        DBUser user = userQuery.get();
        Candid candid = CandidMapper.createToEntity(createDto);
        user.getCandids().add(candid);
        userRepo.save(user);

        // Candid createdCandid = candidService.create(candid);
        // candid.getUser{}.add(user)
        // return CandidMapper.toDto(candidService.create(candid));

        return ResponseEntity.ok(CandidMapper.toDto(candid));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Integer> updateCandid(@PathVariable Integer id, @RequestBody CandidUpdateDto udto) {
        Integer recordsUpdated = candidService.update(udto);
        return ResponseEntity.ok(recordsUpdated);
    }

    @PatchMapping("/{id}/rejected")
    public ResponseEntity<Integer> setCandidRejected(
            @PathVariable Integer id) {

        Integer updated = candidService.setRejected(id);
        return ResponseEntity.ok(updated);
    }

}
