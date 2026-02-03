package com.jobhunter.backend.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class CompanyPagination {
  public static Pageable pageByName(int p, int s) {
    return PageRequest.of(
        p,
        s,
        Sort.by("name").ascending());
  }
  public static Pageable pageByLastDateApply(int p, int s) {
    return PageRequest.of(
        p,
        s,
        Sort.by("Todo").descending());
  }
}
