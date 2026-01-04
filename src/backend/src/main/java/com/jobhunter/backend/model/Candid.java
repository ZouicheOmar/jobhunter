package com.jobhunter.backend.model;

// TODO les annotation concernant la définition de tables provient de 
// jpa (jakarta.persistence) ou de hibernate ? ou même de spring data ?

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.jobhunter.backend.enums.ContractType;

// import jakarta.persistence.CascadeType;
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
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// @Data
//

// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
// @NoArgsConstructor(access = AccessLevel.PROTECTED)

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "stack")
@EqualsAndHashCode(exclude = "stack")
public class Candid {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Integer id;

  private String title;

  @ManyToOne
  @JoinColumn(name = "city_id")
  @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
  @JsonBackReference(value = "candid-city")
  private City city;

  @OneToOne
  @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
  @JoinColumn(name = "contract_id", referencedColumnName = "id")
  private Contract contract;

  @OneToMany(mappedBy = "candid")
  @Column(nullable = true)
  @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
  @JsonBackReference(value = "candid-interviews")
  private Set<Interview> interviews;

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
  private List<Tech> stack;

  // @Builder.Default
  // private List<Tech> stack = new ArrayList<Tech>();

  @CreatedDate
  @Column(columnDefinition = "DATE")
  private LocalDate dateApply;

  @Column
  private Boolean answer;

  @Column(nullable = true)
  private Boolean rejected;

  @Column(updatable = false)
  private Boolean unsolicited;

  @Column(updatable = false)
  private Boolean techOffer;

  // @Column
  // @Builder.Default
  // private Boolean answer = false;
  //
  // @Column(nullable = true)
  // @Builder.Default
  // private Boolean rejected = false;
  //
  // @Column(updatable = false)
  // @Builder.Default
  // private Boolean unsolicited = false;
  //
  // @Column(updatable = false)
  // @Builder.Default
  // private Boolean techOffer = true;
}
