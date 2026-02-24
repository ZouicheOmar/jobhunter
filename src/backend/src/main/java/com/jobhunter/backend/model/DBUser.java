package com.jobhunter.backend.model;

import com.jobhunter.backend.enums.AuthorityType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "candids")
@EqualsAndHashCode(exclude = "candids")
public class DBUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;

    private String password;

    private AuthorityType authority;

    @OneToMany
    @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
    @JsonManagedReference
    private List<Candid> candids;
}
