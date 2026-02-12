package com.jobhunter.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/c")
@Slf4j
public class CurlController {

    private Integer logReq(HttpServletRequest req) {
        log.info("==========");
        req.getHeaderNames().asIterator().forEachRemaining(i -> {
            log.info("[header] {} : {} ",i.toString(), req.getHeader(i.toString()));
        });
        log.info("==========");
        return 0;
    }

    @GetMapping("/public")
    public ResponseEntity<String> handleCurl(HttpServletRequest req) {
        logReq(req);
        return ResponseEntity.ok("ok de la part de spring\n");
    }

    @GetMapping("/protected")
    public ResponseEntity<String> handleProtected(HttpServletRequest req) {
        logReq(req);
        return ResponseEntity.ok("Si tu lis ça c'est que t'es authentifié.\nLes données de ta session actuelle :");
    }

}
