package com.jobhunter.backend.mapper;

import com.jobhunter.backend.dto.CandidCreateDto;
import com.jobhunter.backend.dto.CandidDto;
import com.jobhunter.backend.dto.CandidUpdateDto;
import com.jobhunter.backend.model.Candid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class CandidMapper {

    public static Candid createToEntity(CandidCreateDto cdto) {
        Candid candid = new Candid();

        candid.setUrl(cdto.url());
        candid.setTitle(cdto.title());
        candid.setUnsolicited(cdto.unsolicited());
        candid.setTechOffer(cdto.techOffer());
        candid.setAnswer(cdto.answer());
        candid.setDateApply(
                LocalDate.parse(cdto.dateApply(), DateTimeFormatter.ISO_DATE_TIME));
        candid.setCompany(CompanyMapper.createToEntity(cdto.company()));
        candid.setCity(CityMapper.toEntity(cdto.city()));
        candid.setWebsite(WebsiteMapper.createToEntity(cdto.website()));
        candid.setContract(ContractMapper.createToEntity(cdto.contract()));
        candid.setStack(StackMapper.createToEntity(cdto.stack()));

        return candid;
    }

    public static Candid toEntity(CandidDto dto) {
        var candid = new Candid();
        LocalDate date = LocalDate.parse(dto.dateApply(), DateTimeFormatter.ISO_DATE_TIME);

        candid.setUrl(dto.url());
        candid.setTitle(dto.title());
        candid.setUnsolicited(dto.unsolicited());
        candid.setTechOffer(dto.techOffer());
        candid.setAnswer(dto.answer());
        candid.setRejected(dto.rejected());
        candid.setDateApply(date);
        candid.setCompany(CompanyMapper.toEntity(dto.company()));
        candid.setCity(CityMapper.toEntity(dto.city()));
        candid.setWebsite(WebsiteMapper.toEntity(dto.website()));
        candid.setContract(ContractMapper.toEntity(dto.contract()));
        candid.setStack(StackMapper.toEntity(dto.stack()));

        return candid;
    }

    // ça n'a rien à faire ici
    public static List<String> getTechList(Candid candid) {
        return candid
                .getStack()
                .stream()
                .map(tech -> tech.getName())
                .collect(Collectors.toList());
    }

    public static CandidDto toDto(Candid candid) {
        return new CandidDto(candid.getId(),
                candid.getUrl(),
                candid.getTitle(),
                candid.getUnsolicited(),
                candid.getTechOffer(),
                candid.getAnswer(),
                candid.getRejected(),
                candid.getDateApply().toString(),
                CompanyMapper.toDto(candid.getCompany()),
                CityMapper.toDto(candid.getCity()),
                WebsiteMapper.toDto(candid.getWebsite()),
                ContractMapper.toDto(candid.getContract()),
                StackMapper.toDto(candid.getStack()));
    }

    public static List<CandidDto> toAllDto(List<Candid> candids) {
        return candids
                .stream()
                .map(candid -> toDto(candid))
                .toList();
    }
}
