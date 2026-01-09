package com.jobhunter.backend.repository;

import com.jobhunter.backend.model.City;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
    public City findByName(String name);
    public Optional<City> findByZipcode(Integer zipcode);

    public List<City> findAllByNameContaining(String name, Limit limit);

    @Query(
        value = "select * from City where zipcode::varchar(10) like %:zipcodeStr% limit 4",
        nativeQuery = true
    )
    public List<City> findAllByZipcodeContaining(
        @Param("zipcodeStr") String zipcodeStr
    );
}
