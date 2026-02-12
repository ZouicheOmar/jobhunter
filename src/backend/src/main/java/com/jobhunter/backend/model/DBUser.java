package com.jobhunter.backend.model;

import com.jobhunter.backend.enums.AuthorityType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;

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

    @ManyToMany
    @Column(nullable = true)
    @JoinTable(name = "user_candid", joinColumns = @JoinColumn(name = "dbuser_id"), inverseJoinColumns = @JoinColumn(name = "candid_id"))
    @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
    @JsonBackReference(value = "dbuser-candid")
    private List<Candid> candids;
}
