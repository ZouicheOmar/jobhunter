package com.jobhunter.backend.model;

import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.jobhunter.backend.enums.ContractType;

@Entity
@Data
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

  @Column(nullable = true)
  private String[] stack;

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
}
