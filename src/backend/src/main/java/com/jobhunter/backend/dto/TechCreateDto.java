package com.jobhunter.backend.dto;

import java.util.Optional;

// both fields are optionals, in practice it's either id or name
// if name: create a new tech
// else : tech already exists
public record TechCreateDto(Optional<Integer> id, Optional<String> name) {}
