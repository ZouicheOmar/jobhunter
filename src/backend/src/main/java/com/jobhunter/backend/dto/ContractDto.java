package com.jobhunter.backend.dto;

import com.jobhunter.backend.enums.ContractType;

public record ContractDto(ContractType contractType, String duration) {}
