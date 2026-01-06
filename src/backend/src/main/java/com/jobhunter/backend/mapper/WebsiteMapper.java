package com.jobhunter.backend.mapper;

import com.jobhunter.backend.dto.WebsiteCreateDto;
import com.jobhunter.backend.dto.WebsiteDto;
import com.jobhunter.backend.model.Website;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class WebsiteMapper {

    public Website toEntity(WebsiteDto dto) {
        var website = new Website();
        website.setName(dto.name());
        return website;
    }

    public Website createToEntity(WebsiteCreateDto cdto) {
        Website website = new Website();
        cdto.id().ifPresent(id -> website.setId(id));
        website.setName(cdto.name());
        return website;
    }

    public WebsiteDto toDto(Website website) {
        return new WebsiteDto(website.getId(), website.getName());
    }

    public List<WebsiteDto> toAllDto(List<Website> websites) {
        return websites
            .stream()
            .map(website -> toDto(website))
            .collect(Collectors.toList());
    }
}
