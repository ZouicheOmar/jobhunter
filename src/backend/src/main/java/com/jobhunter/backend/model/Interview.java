package com.jobhunter.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.util.List;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

enum InterviewType {
    CALL,
    INTERVIEW,
    TECHNICAL,
}

@Entity(name = "Interview")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "candid")
@EqualsAndHashCode(exclude = "candid")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private Integer interviewNumber; // adding manual ?

    private InterviewType interviewType;
    private Boolean remote;

    // TODO refine relationships directions

    // this is the owning side;
    // no need to refernce this on the person table
    // this will create a join table
    @ManyToMany
    @JoinTable(
        name = "interview_participants",
        joinColumns = @JoinColumn(name = "interview_id"),
        inverseJoinColumns = @JoinColumn(name = "person_id")
    )
    private List<Person> participants;

    @ManyToOne
    @JoinColumn(name = "candid_id")
    @JsonManagedReference(value = "candid-interviews")
    private Candid candid;
}
