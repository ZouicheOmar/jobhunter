package com.jobhunter.backend.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class CandidPagination {
  public static Pageable pageByDateApply(int p, int s) {
    return PageRequest.of(
        p,
        s,
        Sort.by("dateApply").descending());
  }
}
