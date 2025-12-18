package com.jobhunter.backend.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
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

  // @Enumerated(EnumType.STRING)
  // private ContractType contractType;

  @OneToOne
  @JoinColumn(name = "contract_id")
  private Contract contract;

  // @JoinTable(name = "candid_interview", joinColumns = @JoinColumn(name =
  // "candid_id"), inverseJoinColumns = @JoinColumn(name = "interview_id"))
  // private List<Interview> interview = new List<Interview>();

  @OneToMany(mappedBy = "candid")
  @Column(nullable = true)
  @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
  @JsonBackReference(value = "candid-interviews")
  private Set<Interview> interviews;

  // So on the object side (java), it's a ref to an object
  // but on db side it's just an id ??
  @ManyToOne
  @JoinColumn(name = "company_id", nullable = true)
  private Company company;

  @Column(nullable = true)
  private String url;

  @ManyToOne
  @JoinColumn(name = "website_id")
  @JsonBackReference(value = "candid-website")
  private Website website;

  @ManyToMany
  @Column(nullable = true)
  @JoinTable(name = "candid_stack", joinColumns = @JoinColumn(name = "candid_id"), inverseJoinColumns = @JoinColumn(name = "tech_id"))
  @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
  @JsonBackReference(value = "candid-stack")
  private Set<Tech> stack = new HashSet<>();

  @CreatedDate
  @Column(columnDefinition = "DATE")
  private LocalDate addDate;

  @Column(nullable = true)
  private Boolean answer = false;

  @Column(nullable = true)
  private Boolean rejected = false;

  @Column(updatable = false)
  private Boolean unsolicited;

  @Column(updatable = false)
  private Boolean techOffer;

  // TODO remove this
  // FIX: Doesn't have anything to do in here
  public void addTech(Tech tech) {
    stack.add(tech);
  }
}
