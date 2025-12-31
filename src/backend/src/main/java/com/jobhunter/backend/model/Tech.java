package com.jobhunter.backend.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

enum TechName {
  JAVASCRIPT,
  TYPESCRIPT,
  REACT,
  DJANGO,
  SPRINGBOOT,
  DOCKER,
  GIT,
  GITHUB,
  GITLAB,
  KUBERNETES,
  ANSIBLE,
  GO,
  RUBY,
  RUBY_ON_RAILS,
  CPP,
  C,
  PHP,
  LARAVEL,
  SYMPHONY,
}

@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(name = "unique_tech_name", columnNames = "name")
})
@Data
@ToString(exclude = "candids")
@EqualsAndHashCode(exclude = "candids")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tech {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  public Integer id;

  public String name;

  @ManyToMany(mappedBy = "stack")
  @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
  @JsonManagedReference(value = "candid-stack")
  private Set<Candid> candids;

  public void addCandid(Candid candid) {
    candids.add(candid);
  }
}
