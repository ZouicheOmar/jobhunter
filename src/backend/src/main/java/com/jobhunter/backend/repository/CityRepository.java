package com.jobhunter.backend.repository;

import java.util.List;

import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jobhunter.backend.model.City;

public interface CityRepository extends JpaRepository<City, Integer> {
  public City findByName(String name);

  // Q: est ce que je dois donner %name% ou name ?
  // name, par définition le parametre est bound entre %%
  public List<City> findAllByNameContaining(String name, Limit limit);

  // Q: Est ce que ça va confondre celle définie par spring jpa avec @Query ?
  // je crois pas
  @Query(value = "select c from City c where c.zipcode::varchar(10) like %:zipcodeStr% limit 4", nativeQuery = true)
  public List<City> findAllByZipcodeContaining(@Param("zipcodeStr") String zipcodeStr);
}
