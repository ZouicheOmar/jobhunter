package com.jobhunter.backend.mapper;

import com.jobhunter.backend.dto.ContractCreateDto;
import com.jobhunter.backend.dto.ContractDto;
import com.jobhunter.backend.model.Contract;
import org.springframework.stereotype.Component;

@Component
public class ContractMapper {

    public static Contract createToEntity(ContractCreateDto cdto) {
        Contract c = new Contract();
        c.setContractType(cdto.contractType());
        cdto.duration().ifPresent(d -> c.setDuration(d));
        return c;
    }

    public static ContractDto toDto(Contract contract) {
        return new ContractDto(
            contract.getContractType(),
            contract.getDuration()
        );
    }

    public static ContractDto stoDto(Contract contract) {
        return new ContractDto(
            contract.getContractType(),
            contract.getDuration()
        );
    }
}
