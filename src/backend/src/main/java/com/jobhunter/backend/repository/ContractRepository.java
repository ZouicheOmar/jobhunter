package com.jobhunter.backend.repository;

import com.jobhunter.backend.model.Contract;
import com.jobhunter.backend.enums.ContractType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract, Integer> {
    // TODO maybe some agregate function, like number of CDI, number of CDD,
    // but maybe it is already implemented in jpa, like the len of the list,
    // although if the list gets defined it will consume memory for nothing..
    public Contract findByContractType(ContractType type);
    // TODO how to translate a type to an enum ??
}
