package com.jobhunter.backend.repository;

import com.jobhunter.backend.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;

import org.springframework.data.domain.Pageable;

@Repository
public interface CompanyPagingAndSortingRepository extends PagingAndSortingRepository<Company, Integer> {
	public Page<Company> findAll(Pageable page);
}
