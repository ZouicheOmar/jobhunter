package com.jobhunter.backend.controller;

import com.jobhunter.backend.enums.ContractType;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contract")
public class ContractController {

    @GetMapping
    public List<ContractType> findAll() {
        return Arrays.asList(ContractType.values());
    }
}
