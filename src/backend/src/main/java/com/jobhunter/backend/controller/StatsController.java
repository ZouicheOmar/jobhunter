package com.jobhunter.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jobhunter.backend.dto.StatsDto;
import com.jobhunter.backend.mapper.CandidMapper;
import com.jobhunter.backend.mapper.CityMapper;
import com.jobhunter.backend.mapper.TechMapper;
import com.jobhunter.backend.model.Stats;
import com.jobhunter.backend.service.StatsService;

@RestController
@RequestMapping("/stats")
public class StatsController {

	@Autowired
	private StatsService statsService;

	@GetMapping
	public ResponseEntity<StatsDto> get() {
		Optional<Stats> stats = statsService.get();
		if (stats.isPresent()) {
			Stats values = stats.get();
			StatsDto dto = new StatsDto(
					values.getNumCandids(),
					values.getNumUnsolicited(),
					CandidMapper.toDto(values.getLastCandid()),
					values.getTopCities());
			return ResponseEntity.ok(dto);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
