package com.jobhunter.backend.service;

import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.repository.TechRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StackService {

    @Autowired
    private TechRepository techRepository;

    private List<Tech> saveAll(List<Tech> s) {
        return s
            .stream()
            .map(t -> techRepository.save(t))
            .collect(Collectors.toList());
    }

    private Stream<Tech> findAll(List<Tech> stack) {
        return stack
            .stream()
            .map(tech -> techRepository.findById(tech.getId()))
            .map(item -> item.orElse(null))
            .filter(Objects::nonNull);
    }

    private Stream<Tech> createAll(List<Tech> stack) {
        return stack.stream().map(t -> techRepository.save(t));
    }

    public List<Tech> findAllOrCreateByName(List<Tech> stack) {
        List<Tech> toCreate = new ArrayList<Tech>();
        List<Tech> toQuery = new ArrayList<Tech>();

        stack.forEach(tech -> {
            if (tech.getId() != null) toQuery.add(tech);
            else toCreate.add(tech);
        });

        Stream<Tech> stackFound = findAll(toQuery);
        Stream<Tech> createdStack = createAll(toCreate);

        return Stream.concat(createdStack, stackFound).collect(
            Collectors.toList()
        );
    }

    // private List<Tech> saveAll(List<TechCreateDto> stackDto) {
    //     return stackDto
    //         .stream()
    //         .map(techDto -> techRepository.save(new Tech(techDto.name())))
    //         .collect(Collectors.toList());
    // }

    // private List<Tech> findAllExistingDto(List<TechDto> stackDto) {
    //     return stackDto
    //         .stream()
    //         .map(techDto -> techRepository.findById(techDto.id()))
    //         .map(item -> item.orElse(null))
    //         .filter(Objects::nonNull)
    //         .collect(Collectors.toList());
    // }

    // private List<TechDto> extractTechWithId(
    //     List<TechCreateDto> stackCreateDto
    // ) {
    //     List<TechDto> stackToFind = new ArrayList<TechDto>();
    //     stackCreateDto.forEach(techCreateDto -> {
    //         techCreateDto
    //             .id()
    //             .ifPresent(id ->
    //                 stackToFind.add(new TechDto(id, techCreateDto.name()))
    //             );
    //     });
    //     return stackToFind;
    // }

    // public List<Tech> findAllOrCreateByName(List<TechCreateDto> stackCreateDto) {
    //   List<TechCreateDto> stackToCreate = stackCreateDto.stream().filter((item) -> item.id().isEmpty())
    //       .collect(Collectors.toList());
    //   List<TechDto> stackToFind = extractTechWithId(stackCreateDto);

    //   List<Tech> createdStack = saveAll(stackToCreate);
    //   List<Tech> stackFound = findAllExisting(stackToFind);

    //   return Stream.concat(createdStack.stream(), stackFound.stream())
    //       .collect(Collectors.toList());
    // }
}
