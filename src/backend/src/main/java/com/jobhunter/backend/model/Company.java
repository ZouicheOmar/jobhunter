package com.jobhunter.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

enum CompanySize {
  GE,
  ETI,
  PME
}

@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(name = "unique_company_name", columnNames = "name")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Integer id;

  private String name;

  @Enumerated(EnumType.STRING)
  private CompanySize size;

  private List<String> domains;

  @OneToMany(mappedBy = "company")
  @JsonManagedReference(value = "candid-company")
  private List<Candid> candids;
}
