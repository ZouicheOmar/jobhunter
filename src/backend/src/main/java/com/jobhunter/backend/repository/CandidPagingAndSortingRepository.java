package com.jobhunter.backend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.jobhunter.backend.model.Candid;

@Repository
public interface CandidPagingAndSortingRepository extends PagingAndSortingRepository<Candid, Integer> {
  public Page<Candid> findAll(Pageable page);
}
