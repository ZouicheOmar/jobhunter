package com.jobhunter.backend.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.jobhunter.backend.enums.ContractType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@ToString(exclude = "stack")
@EqualsAndHashCode(exclude = "stack")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candid {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Integer id;

  private String title;

  @ManyToOne
  @JoinColumn(name = "city_id", nullable = false)
  @JsonBackReference(value = "candid-city")
  private City city;

  @Enumerated(EnumType.STRING)
  private ContractType contractType;

  @ManyToOne
  @JoinColumn(name = "website_id")
  @JsonBackReference(value = "candid-website")
  private Website website;

  @ManyToMany
  @Column(nullable = true)
  @JoinTable(name = "candid_stack", joinColumns = @JoinColumn(name = "candid_id"), inverseJoinColumns = @JoinColumn(name = "tech_id"))
  @Cascade({ CascadeType.SAVE_UPDATE, CascadeType.MERGE, CascadeType.PERSIST })
  @JsonBackReference(value = "candid-stack")
  private Set<Tech> stack = new HashSet<>();

  @Column(nullable = true)
  private String url;

  @Column(nullable = true)
  private String company;

  @Column(updatable = false)
  private Boolean unsolicited;
  @CreatedDate
  @Column(columnDefinition = "DATE")
  private LocalDate addDate;

  @Column(nullable = true)
  private Boolean answer;

  public void addTech(Tech tech) {
    stack.add(tech);
  }
}
