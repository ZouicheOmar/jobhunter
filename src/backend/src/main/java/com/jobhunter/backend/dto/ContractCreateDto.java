package com.jobhunter.backend.dto;

import com.jobhunter.backend.enums.ContractType;
import java.util.Optional;

public record ContractCreateDto(
    ContractType contractType,
    Optional<String> duration
) {}
