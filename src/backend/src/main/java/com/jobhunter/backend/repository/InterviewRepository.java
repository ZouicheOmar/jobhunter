package com.jobhunter.backend.repository;

import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
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
