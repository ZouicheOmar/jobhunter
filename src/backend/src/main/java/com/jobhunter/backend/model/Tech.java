package com.jobhunter.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.util.Set;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

// @Table(uniqueConstraints = {
//     @UniqueConstraint(name = "unique_tech_name", columnNames = "name")
// })

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "candids")
@EqualsAndHashCode(exclude = "candids")
public class Tech {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(unique = true)
    @NonNull
    private String name;

    @ManyToMany(mappedBy = "stack")
    @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
    @JsonManagedReference(value = "candid-stack")
    private Set<Candid> candids;

    // TODO is this right ?
    public Tech(String name) {
        this.name = name;
    }

    // TODO ????
    // public void addCandid(Candid candid) {
    // candids.add(candid);
    // }
}
