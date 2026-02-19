package com.jobhunter.backend.service;

import com.jobhunter.backend.dto.WebsiteCreateDto;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.repository.WebsiteRepository;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

@Service
public class WebsiteService {

    @Autowired
    private WebsiteRepository websiteRepository;

    public Website save(Website website) {
        try {
            return websiteRepository.save(website);
        } catch (DataIntegrityViolationException e) {
            return null;
        }
    }

    public List<Website> saveAll(List<Website> websites) {
        try {
            return websiteRepository.saveAll(websites);
        } catch (DataIntegrityViolationException e) {
            return null;
        }
    }

    public List<Website> findAll() {
        return websiteRepository.findAll();
    }

    public List<Website> findAllByNameContaining(String websiteName) {
        return websiteRepository.findAllByNameContaining(
                websiteName,
                Limit.of(4));
    }

    public Website findOrCreate(Website w) {
        if (w.getId() == null) {
            return websiteRepository.save(w);
        } else {
            return websiteRepository
                    .findByName(w.getName())
                    .orElseGet(() -> websiteRepository.save(w));
        }
    }

    public Website findOrCreateByName(String name) {
        return websiteRepository
                .findByName(name)
                .orElseGet(() -> websiteRepository.save(new Website(name)));
    }

    public Website findOrCreateByDto(WebsiteCreateDto cdto) {
        return cdto
                .id()
                .map(websiteRepository::findById)
                .flatMap(Function.identity())
                .orElseGet(() -> save(new Website(cdto.name())));
    }

    public Optional<Website> findById(Integer id) {
        return websiteRepository.findById(id);
    }
}
