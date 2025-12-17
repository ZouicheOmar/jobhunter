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

enum InterviewType {
  CALL,
  INTERVIEW,
  TECHNICAL
}

@Entity(name = "Interview")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interview {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Integer id;

  private InterviewType type;
  private Boolean remote;
  private List<Person> participants;

  @OneToMany(mappedBy = "city")
  @JsonManagedReference(value = "candid-city")
  private List<Candid> candids;
}
