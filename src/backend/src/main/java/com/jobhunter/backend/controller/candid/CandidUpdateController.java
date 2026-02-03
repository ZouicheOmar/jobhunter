package com.jobhunter.backend.controller.candid;

import com.jobhunter.backend.dto.CandidUpdateDto;
import com.jobhunter.backend.service.CandidService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class CandidUpdateController extends CandidBaseController {
        @Autowired
        private CandidService candidService;

        @PatchMapping("/{id}")
        public ResponseEntity<Integer> updateCandid(@PathVariable Integer id, @RequestBody CandidUpdateDto udto) {
                Integer recordsUpdated = candidService.update(udto);
                return ResponseEntity.ok(recordsUpdated);
        }

        @PatchMapping("/{id}/rejected")
        public ResponseEntity<Integer> setCandidRejected(
                        @PathVariable Integer id) {

                Integer updated = candidService.setRejected(id);
                return ResponseEntity.ok(updated);
        }

}
