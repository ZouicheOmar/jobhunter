package com.jobhunter.backend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jobhunter.backend.interfaces.ICityCount;
import com.jobhunter.backend.model.Candid;

@Repository
public interface CandidRepository extends JpaRepository<Candid, Integer> {
  // public Page<Candid> findAll(Pageable page);

  public List<Candid> findAllByCityName(String cityName); // ça va automatiquement chercher candid.city.name
  public List<Candid> findAllByWebsiteName(String websiteName);
  public List<Candid> findAllByCityNameAndWebsiteName(String cityName, String websiteName);
  Candid findFirstByOrderByDateApplyDesc();
  @Query(value = "SELECT c. city_id AS cityCandidId, COUNT(c.*) AS totalCandid FROM candid AS c GROUP BY c.city_id ORDER BY totalCandid DESC limit 5;", nativeQuery = true)
  List<ICityCount> countCandidByCityNative();
  @Query(value = "SELECT count(*) from candid where unsolicited = true;", nativeQuery = true)
  Long countCandidByUnsolicited();
}
