package com.jobhunter.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

enum PersonPosition {
  PRESIDENT,
  MANAGER,
  EMPLOYEE
}

enum PersonOccupation {
  HR, // HR ==> EMPLOYEE
  DEVELOPER, // DEVELOPER ==> PRESIDENT | MANAGER | EMPLOYEE
  PRODUCT, // PRODUCT OWER ==> MANAGER
  ENGINEER, // EMPLOYEE OR MANANAGER
}

@Entity(name = "Person")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Person {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Integer id;

  private String first;
  private String last;

  private PersonPosition position;
  private PersonOccupation occupation;

  private String mail; // optional
  private String phone;
  private String linkedin;
}
