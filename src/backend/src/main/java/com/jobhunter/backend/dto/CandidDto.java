package com.jobhunter.backend.dto;

// je peux avoir city en id vu que je vais la mapper côté front
public record CandidDto(
    String title,
    Integer cityId,
    Integer websiteId,
    String[] stack,
    String url,
    String company,
    Boolean unsolicited,
    Boolean answer) {
}
