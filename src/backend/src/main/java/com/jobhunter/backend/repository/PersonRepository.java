package com.jobhunter.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jobhunter.backend.model.Person;

public interface PersonRepository extends JpaRepository<Person, Integer> {
    public Person findByFirstName(String firstName);

    public Person findByLastName(String lastName);

    public List<Person> findAllByCompanyName(String companyName);

    public List<Person> findAllByCompanyId(Integer companyId);
}
