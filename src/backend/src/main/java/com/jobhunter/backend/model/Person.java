package com.jobhunter.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

enum PersonPosition {
    PRESIDENT,
    MANAGER,
    EMPLOYEE,
}

enum PersonOccupation {
    HR, // HR ==> EMPLOYEE
    DEVELOPER, // DEVELOPER ==> PRESIDENT | MANAGER | EMPLOYEE
    PRODUCT, // PRODUCT OWER ==> MANAGER
    ENGINEER, // EMPLOYEE OR MANANAGER
}

@Entity(name = "Person")
@Getter
@Setter
@NoArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String firstName;
    private String lastName;

    private PersonPosition position;
    private PersonOccupation occupation;

    // TODO
    @ManyToOne
    // @JoinColumn(mappedBy="Person", )
    private Company company;

    private String mail; // optional
    private String phone;
    private String linkedin;
}
