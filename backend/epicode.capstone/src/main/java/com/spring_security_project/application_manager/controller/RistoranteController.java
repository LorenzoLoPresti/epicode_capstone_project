package com.spring_security_project.application_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring_security_project.application_manager.repository.RistoranteRepository;
import com.spring_security_project.application_manager.service.RistoranteService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/grand_bistrot/ristoranti")
public class RistoranteController {
	
	@Autowired RistoranteService ristoranteService;
	@Autowired RistoranteRepository ristoranteRepo;
	
	@GetMapping("/{citta}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> trovaRistorantiPerCitta (@PathVariable String citta) {
		if(!ristoranteRepo.existsByCitta(citta)) {
			return new ResponseEntity<>("Ristoranti non trovati", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(ristoranteService.cercaPerCitta(citta), HttpStatus.ACCEPTED);
	}
}
