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
    private static CityMapper cityMapper;

    @Autowired
    private static WebsiteMapper websiteMapper;

    @Autowired
    private static StackMapper stackMapper;

    @Autowired
    private static CompanyMapper companyMapper;

    @Autowired
    private static ContractMapper contractMapper;

    public static Candid createToEntity(CandidCreateDto cdto) {
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

    public static Candid toEntity(CandidDto dto) {
        // unused
        var candid = new Candid();
        return candid;
    }

    public static List<String> getTechList(Candid candid) {
        return candid
            .getStack()
            .stream()
            .map(tech -> tech.getName())
            .collect(Collectors.toList());
    }

    public static CandidDto toDto(Candid candid) {
        return new CandidDto(
            candid.getId(),
            candid.getUrl(),
            candid.getTitle(),
            candid.getUnsolicited(),
            candid.getTechOffer(),
            candid.getAnswer(),
            candid.getDateApply().toString(),
            CompanyMapper.toDto(candid.getCompany()),
            CityMapper.toDto(candid.getCity()),
            WebsiteMapper.toDto(candid.getWebsite()),
            ContractMapper.toDto(candid.getContract()),
            StackMapper.toDto(candid.getStack())
        );
    }

    public static List<CandidDto> toAllDto(List<Candid> candids) {
        return candids
            .stream()
            .map(candid -> toDto(candid))
            .toList();
    }
}
