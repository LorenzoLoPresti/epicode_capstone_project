package com.spring_security_project.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring_security_project.application_manager.repository.ChefRepository;
import com.spring_security_project.application_manager.service.ChefService;
import com.spring_security_project.application_manager.service.MenuService;




//@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST }, maxAge = 3600)
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/grand_bistrot/menu")
public class MenuController {
	
	@Autowired MenuService menuService;
	@Autowired ChefService chefService;
	@Autowired ChefRepository chefRepo;

	@GetMapping("/chef_id/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> trovaListaMenuPerChefId(@PathVariable Long id){
		if(!chefRepo.existsById(id)) {
			return new ResponseEntity<>("Chef non trovato", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(menuService.cercaMenuPerIdChef(id), HttpStatus.OK);
	}
}
