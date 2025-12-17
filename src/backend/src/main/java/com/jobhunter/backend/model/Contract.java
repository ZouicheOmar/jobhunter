package com.jobhunter.backend.model;

import java.time.LocalDateTime;
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

enum ContractType {
  CDI, // no duration
  ALTERNANCE,
  CDD,
  STAGE,
  NONSPECIFIE
}

@Entity(name = "Contract")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Integer id;

  private String occupation;
  private ContractType contractType;
  private String duration;
  private LocalDateTime startDate;
}
