package com.jobhunter.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.Interview;

public interface InterviewRepository extends JpaRepository<Interview, Integer> {
    // TODO This will be translated to a query
    // So I might as well simply be making and define these according to the
    // sql queries I'll be making
    //
    // public List<Interview> findAllByCandidId(Interger candidId)
    //
    // this one smells...
    public Interview findByCandid(Candid candidId);
}
