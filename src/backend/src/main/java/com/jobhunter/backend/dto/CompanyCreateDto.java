package com.jobhunter.backend.dto;

import java.util.Optional;

public record CompanyCreateDto(Optional<Integer> id, String name) {}
