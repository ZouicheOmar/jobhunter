package com.jobhunter.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import com.jobhunter.backend.dto.MessageRequestDto;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/debug")
@Slf4j
public class DebugController {
	@Autowired
	private RestClient restClient;

	@GetMapping("/foo")
	MessageRequestDto handleDebug() {
		return restClient.get().uri("/debug/foo").retrieve()
				.onStatus(HttpStatusCode::isError, (req, res) -> {
					log.info("==============================");
					log.error("problem contacting client");
					log.error(res.getStatusCode().toString());
					log.error(res.getStatusText());
					throw new RuntimeException("could not contact combined service");
				}).body(MessageRequestDto.class);
	}

	@GetMapping("/net")
	MessageRequestDto handleNetwork() {
		log.info("==============================");
		log.error("problem contacting client");

		return new MessageRequestDto("hello from backend !");
	}
}
