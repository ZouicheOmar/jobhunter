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

// TODO: get french company types
enum CompanySize {
  TPE,
  PME,
  GE
}

@Entity(name = "Company")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Integer id;

  private String name;
  private CompanySize size;
  private List<String> domains;

  // ça par example je devrais pas l'avoir
  // sauf si je veux accéder plus facilement aux candids
  // faites chez une certaine entreprise
  @OneToMany(mappedBy = "company")
  @JsonManagedReference(value = "candid-company")
  private List<Candid> candids;
}
