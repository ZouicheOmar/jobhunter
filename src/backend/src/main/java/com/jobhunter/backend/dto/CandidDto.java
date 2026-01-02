package com.jobhunter.backend.dto;

import java.util.List;

public record CandidDto(Integer id, String title, String url, String company, String dateApply, Boolean unsolicited,
                Boolean answer, List<String> stack, String cityDto) {
}
