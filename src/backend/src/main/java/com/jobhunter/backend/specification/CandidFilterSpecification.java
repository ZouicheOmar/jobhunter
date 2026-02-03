package com.jobhunter.backend.specification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;

import com.jobhunter.backend.model.Candid;
import com.jobhunter.backend.model.Tech;

import jakarta.persistence.criteria.Join;

public class CandidFilterSpecification {

  public static Specification<Candid> techIs(Integer techId) {
    return (root, query, cb) -> {
      if (techId == null)
        return null;
      Join<Candid, Tech> join = root.join("stack");
      return cb.equal(join.get("id"), techId);
    };
  }

  public static Specification<Candid> cityIs(Integer cityId) {
    return (root, query, cb) -> cityId == null ? null : cb.equal(root.get("city").get("id"), cityId);
  }

  public static Specification<Candid> companyIs(Integer companyId) {
    return (root, query, cb) -> companyId == null ? null : cb.equal(root.get("company").get("id"), companyId);
  }
}
