package com.jobhunter.backend.mapper;

import com.jobhunter.backend.dto.CandidCreateDto;
import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.model.Candid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

// NOTE Doesn't work when annotated as @Component
// makes candid methods unavailable
@Component
public class CandidMapper {

    @Autowired
    private CityMapper cityMapper;

    @Autowired
    private WebsiteMapper websiteMapper;

    @Autowired
    private StackMapper stackMapper;

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private ContractMapper contractMapper;

    public Candid createToEntity(CandidCreateDto cdto) {
        Candid candid = new Candid();

        candid.setUrl(cdto.url());
        candid.setTitle(cdto.title());
        candid.setUnsolicited(cdto.unsolicited());
        candid.setTechOffer(cdto.techOffer());
        candid.setAnswer(cdto.answer());
        candid.setDateApply(
            LocalDate.parse(cdto.dateApply(), DateTimeFormatter.ISO_DATE_TIME)
        );
        candid.setCompany(companyMapper.createToEntity(cdto.company()));
        candid.setCity(cityMapper.toEntity(cdto.city()));
        candid.setWebsite(websiteMapper.createToEntity(cdto.website()));
        candid.setContract(contractMapper.createToEntity(cdto.contract()));
        candid.setStack(stackMapper.createToEntity(cdto.stack()));

        return candid;
    }

    public Candid toEntity(CandidDto dto) {
        // unused
        var candid = new Candid();
        return candid;
    }

    public List<String> getTechList(Candid candid) {
        return candid
            .getStack()
            .stream()
            .map(tech -> tech.getName())
            .collect(Collectors.toList());
    }

    // should probably define multiple dtos according to use
    // for example: CreateCandidDto
    // getBriefCandidDto;
    // getFullCandidDto;
    // updateCandidDto;

    public CandidDto toDto(Candid candid) {
        return new CandidDto(
            candid.getId(),
            candid.getUrl(),
            candid.getTitle(),
            candid.getUnsolicited(),
            candid.getTechOffer(),
            candid.getAnswer(),
            candid.getDateApply().toString(),
            companyMapper.toDto(candid.getCompany()),
            cityMapper.toDto(candid.getCity()),
            websiteMapper.toDto(candid.getWebsite()),
            contractMapper.toDto(candid.getContract()),
            stackMapper.toDto(candid.getStack())
        );
    }

    public List<CandidDto> toAllDto(List<Candid> candids) {
        return candids
            .stream()
            .map(candid -> toDto(candid))
            .toList();
        // .collect(Collectors.toList());
        //
        // .map((candid) -> new CandidDto(
        // candid.getId(),
        // candid.getTitle(),
        // candid.getUrl(),
        // candid.getCompany().getName(),
        // candid.getUnsolicited(),
        // candid.getAnswer(),
        // getTechList(candid),
        // candid.getCity().getName()))
        // .collect(Collectors.toList());
    }
}
