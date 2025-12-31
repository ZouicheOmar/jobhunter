package com.jobhunter.backend.dto;

import java.util.List;

public record CandidCreateDto(String title,
        String url,
        Boolean unsolicited,
        Boolean techOffer, Boolean answer,
        List<String> stack,
        String city,
        String website,
        String company) {
}
