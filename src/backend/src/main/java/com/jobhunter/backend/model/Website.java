package com.jobhunter.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
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
//     @UniqueConstraint(name = "unique_website_name", columnNames = "name")
// })

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "candids")
@EqualsAndHashCode(exclude = "candids")
public class Website {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Integer id;

    @Column(unique = true)
    public String name;

    @OneToMany(mappedBy = "website")
    @JsonManagedReference(value = "candid-website")
    private List<Candid> candids;

    public Website(String name) {
        this.name = name;
    }
}
