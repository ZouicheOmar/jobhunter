package com.jobhunter.backend.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.jobhunter.backend.model.Candid;

@Repository
public interface CandidSpecRepository extends PagingAndSortingRepository<Candid, Integer>,
    JpaSpecificationExecutor<Candid> {
}
