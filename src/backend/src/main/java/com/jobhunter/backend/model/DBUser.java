package com.jobhunter.backend.model;

import com.jobhunter.backend.enums.AuthorityType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    // @OneToMany(mappedBy = "candids")
    // @Column(nullable = true)
    // @JoinTable(name = "user_candid", joinColumns = @JoinColumn(name = "dbuser_id"), inverseJoinColumns = @JoinColumn(name = "candid_id"))
    // @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
    // @JsonBackReference(value = "dbuser-candid")
    // private List<Candid> candids;

    @OneToMany
    @Cascade({ CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST })
    @JsonManagedReference
    private List<Candid> candids;
}
