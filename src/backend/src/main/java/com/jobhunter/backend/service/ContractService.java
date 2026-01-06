package com.jobhunter.backend.service;

import com.jobhunter.backend.enums.ContractType;
import com.jobhunter.backend.model.Contract;
import com.jobhunter.backend.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    public Contract findByContractType(ContractType contractName) {
        return contractRepository.findByContractType(contractName);
    }

    public Contract save(Contract contract) {
        return contractRepository.save(contract);
    }

    public Contract create(Contract contract) {
        return save(contract);
    }
}
