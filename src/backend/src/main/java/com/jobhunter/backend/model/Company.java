package com.jobhunter.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jobhunter.backend.enums.CompanySize;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.List;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// @ToString(exclude = "stack")
// @EqualsAndHashCode(exclude = "stack")

@Entity
@Table(
    uniqueConstraints = {
        @UniqueConstraint(name = "unique_company_name", columnNames = "name"),
    }
)
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "candids")
@EqualsAndHashCode(exclude = "candids")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String name;

    @Enumerated(EnumType.STRING)
    private CompanySize size = CompanySize.PME;

    private List<String> domains;

    @OneToMany(mappedBy = "company")
    @JsonManagedReference(value = "candid-company")
    private List<Candid> candids;

    public Company(String name) {
        this.name = name;
    }
}
