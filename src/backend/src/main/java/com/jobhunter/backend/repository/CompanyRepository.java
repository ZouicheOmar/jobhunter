package com.jobhunter.backend.repository;

import com.jobhunter.backend.model.Company;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
	public Optional<Company> findByName(String name);

	public List<Company> findAllByNameContaining(String name, Limit limit);

	// offset ??
	@Query(value = "select * from company as t1 join (select company_id as cid from (select distinct on (company_id) * from candid) order by date_apply DESC limit 10) as t2 on (t1.id = t2.cid);", nativeQuery = true)
	public List<Company> findAllOrderByCandidDateApply();
}
