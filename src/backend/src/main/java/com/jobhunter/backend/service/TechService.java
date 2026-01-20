package com.jobhunter.backend.service;

import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.repository.TechRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

@Service
public class TechService {

    @Autowired
    private TechRepository techRepository;

    public Tech save(Tech tech) {
        return techRepository.save(tech);
    }

    public List<Tech> findAll() {
        return techRepository.findAll();
    }

    public Tech findOrCreateByName(String name) {
        return techRepository.findByName(name).orElse(save(new Tech(name)));
    }

    public List<Tech> findAllByNameContaining(String name) {
        return techRepository.findAllByNameContaining(name, Limit.of(4));
    }

    public List<Tech> findAllByName(String websiteName) {
        return techRepository.findAllByNameContaining(websiteName, Limit.of(4));
    }

    public List<Tech> findAllByNames(List<String> names) {
        List<Tech> res = new ArrayList<Tech>();
        // TODO: raw query to get all techs from a single pg query

        names.forEach(name -> {
            Optional<Tech> tech = techRepository.findByName(name);
            tech.ifPresent(t -> res.add(t));
        });

        return res;
    }

    // TODO correct this
    public void updateTech(Tech tech) {
        techRepository.save(tech);
    }
}
