package com.jobhunter.backend.controller.candid;

import com.jobhunter.backend.service.CandidService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/candids")
public class CandidBaseController {

    @Autowired
    protected CandidService candidService;
}
