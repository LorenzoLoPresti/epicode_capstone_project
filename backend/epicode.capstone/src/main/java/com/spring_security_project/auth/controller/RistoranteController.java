package com.spring_security_project.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring_security_project.application_manager.repository.ChefRepository;
import com.spring_security_project.application_manager.service.ChefService;
import com.spring_security_project.application_manager.service.MenuService;
import com.spring_security_project.application_manager.service.RistoranteService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/grand_bistrot/ristorante")
public class RistoranteController {
	
	@Autowired RistoranteService ristoranteService;

	@GetMapping("/list/{citta}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> trovaRistoranti (@PathVariable String citta) {
//		if(!ristoranteRepo.existsByCitta(citta)) {
//			return new ResponseEntity<>("Ristoranti non trovati", HttpStatus.NOT_FOUND);
//		}
		return new ResponseEntity<>(ristoranteService.cercaPerCitta(citta), HttpStatus.ACCEPTED);
	}
	
	
//	
//	@Autowired MenuService menuService;
//	@Autowired ChefService chefService;
//	@Autowired ChefRepository chefRepo;
//
//	@GetMapping("/menu/chef_id/{id}")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//	public ResponseEntity<?> trovaListaMenuPerChefId(@PathVariable Long id){
//		if(!chefRepo.existsById(id)) {
//			return new ResponseEntity<>("Chef non trovato", HttpStatus.NOT_FOUND);
//		}
//		return new ResponseEntity<>(menuService.cercaMenuPerIdChef(id), HttpStatus.OK);
//}
}