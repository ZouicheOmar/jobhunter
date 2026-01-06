package com.jobhunter.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jobhunter.backend.enums.ContractType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Contract")
@Getter
@Setter
@NoArgsConstructor
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String occupation;

    @Enumerated(EnumType.STRING)
    private ContractType contractType;

    // TODO duration should be integer and meaning that
    // it defaults to months,
    // NOTE problem casting varchar to int
    private String duration;
    private LocalDateTime startDate;

    @OneToOne(mappedBy = "contract")
    @JsonManagedReference(value = "candid-contract")
    private Candid candid;

    public Contract(ContractType contracType, String duration) {
        this.contractType = contracType;
        this.duration = duration;
    }
}
