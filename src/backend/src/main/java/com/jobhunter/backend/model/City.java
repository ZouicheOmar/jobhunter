package com.jobhunter.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// @Table(uniqueConstraints = {
//     @UniqueConstraint(name = "unique_city_name", columnNames = "name")
// })

// TODO : This table should be immutable somehow
// no routes to create cities, or some jpa config
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "candids")
@EqualsAndHashCode(exclude = "candids")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String name;

    private String label;

    private Integer zipcode;

    private String dep_id;

    private Integer reg_id;

    @OneToMany(mappedBy = "city")
    @JsonManagedReference(value = "candid-city")
    private List<Candid> candids;
}
