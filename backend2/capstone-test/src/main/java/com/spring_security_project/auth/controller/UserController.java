package com.spring_security_project.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring_security_project.application_manager.repository.RistoranteRepository;
import com.spring_security_project.application_manager.service.RistoranteService;
import com.spring_security_project.auth.entity.User;
import com.spring_security_project.auth.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/grand_bistrot/users")
public class UserController {
	
	@Autowired UserRepository userRepo;

	@GetMapping("/{username}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> trovaClientePerUsername (@PathVariable String username) {
		if(!userRepo.existsByUsername(username)) {
			return new ResponseEntity<>("Username non trovato", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(userRepo.findByUsername(username).get(), HttpStatus.ACCEPTED);
	}
	
	@Autowired RistoranteService ristoranteService;
	@Autowired RistoranteRepository ristoranteRepo;
	
	@GetMapping("/citta/{citta}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> trovaRistorantiPerCitta (@PathVariable String citta) {
		if(!ristoranteRepo.existsByCitta(citta)) {
			return new ResponseEntity<>("Ristoranti non trovati", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(ristoranteService.cercaPerCitta(citta), HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/edit/{username}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> modificaCittaUser(@PathVariable String username, @RequestBody String citta){
		if(!userRepo.existsByUsername(username)) {
			return new ResponseEntity<>("Username non trovato", HttpStatus.NOT_FOUND);
		}
		User u = userRepo.findByUsername(username).get();
		u.setCitta(citta);
		return new ResponseEntity<>(userRepo.save(u), HttpStatus.OK);
		
	}
	
//	@GetMapping("/list")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//	public ResponseEntity<?> trovaUtenti () {
////		if(!ristoranteRepo.existsByCitta(citta)) {
////			return new ResponseEntity<>("Ristoranti non trovati", HttpStatus.NOT_FOUND);
////		}
//		return new ResponseEntity<>(userRepo.findAll(), HttpStatus.ACCEPTED);
//	}
}
