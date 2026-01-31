package com.jobhunter.backend.service;

import com.jobhunter.backend.dto.CandidUpdateDto;
import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.City;
import com.jobhunter.backend.model.Company;
import com.jobhunter.backend.model.Contract;
import com.jobhunter.backend.model.Tech;
import com.jobhunter.backend.model.Website;
import com.jobhunter.backend.repository.CandidPagingAndSortingRepository;
import com.jobhunter.backend.repository.CandidRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CandidService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private CandidPagingAndSortingRepository candidpagingandsortingrepository;

    @Autowired
    private CandidRepository candidRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private StackService stackService;

    @Autowired
    private CityService cityService;

    @Autowired
    private WebsiteService websiteService;

    @Autowired
    private ContractService contractService;

    public List<Candid> findAll() {
        return candidRepository.findAll(Sort.by("dateApply"));
    }

    public Candid findById(Integer id) {
        return candidRepository.findById(id).orElseGet(() -> null);
    }

    public List<Candid> findAllByCityName(String cityName) {
        return candidRepository.findAllByCityName(cityName);
    }

    public List<Candid> findAllByWebsiteName(String websiteName) {
        return candidRepository.findAllByWebsiteName(websiteName);
    }

    public List<Candid> findAllByCityNameAndWebsiteName(
            String cityName,
            String websiteName) {
        return candidRepository.findAllByCityNameAndWebsiteName(
                cityName,
                websiteName);
    }

    public Page<Candid> findAllPageable(Pageable paging) {
        return candidpagingandsortingrepository.findAll(paging);
    }

    @Transactional
    public Integer setRejected(Integer id){
        return candidRepository.setRejected(id);
    }

    @Transactional
    public Integer update(CandidUpdateDto udto) {
        Integer id = udto.id();
        return candidRepository.update(
                udto.answer(),
                udto.rejected(),
                udto.techOffer(),
                udto.unsolicited(),
                id);
    }

    public Candid save(Candid candid) {
        return candidRepository.save(candid);
    }

    public Candid create(Candid candid) {
        Company company = companyService.findOrCreate(candid.getCompany());
        candid.setCompany(company);

        City city = cityService.findById(candid.getCity().getId());
        candid.setCity(city);

        Website website = websiteService.findOrCreate(candid.getWebsite());
        candid.setWebsite(website);

        List<Tech> stack = stackService.findAllOrCreateByName(
                candid.getStack());
        Contract contract = contractService.create(candid.getContract());

        candid.setCompany(company);
        candid.setCity(city);
        candid.setWebsite(website);
        candid.setStack(stack);
        candid.setContract(contract);

        return save(candid);
    }

    // this is not used
    public String saveAll(ArrayList<Candid> candids) {
        candidRepository.saveAll(candids);
        return "probably saved";
    }

    // this is prob not used either
    public void deleteById(Integer id) {
        candidRepository.deleteById(id);
        return;
    }
}
