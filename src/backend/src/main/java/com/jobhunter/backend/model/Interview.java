package com.jobhunter.backend.model;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
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

  private Integer interviewNumber; // adding manual ?

  private InterviewType interviewType;
  private Boolean remote;
  // TODO refine relationships directions

  // this is the owning side;
  // no need to refernce this on the person table
  // this will create a join table
  @ManyToMany
  @JoinTable(name = "interview_participants", joinColumns = @JoinColumn(name = "interview_id"), inverseJoinColumns = @JoinColumn(name = "person_id"))
  private List<Person> participants;

  @ManyToOne
  @JoinColumn(name = "candid_id")
  @JsonManagedReference(value = "candid-interviews")
  private Candid candid;
}
