package com.spring_security_project.application_manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring_security_project.application_manager.model.Chef;
import com.spring_security_project.application_manager.repository.ChefRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ChefService {
	
	@Autowired ChefRepository repoChef;
	
	// CRUD
	
		public Chef salva(Chef chef) {
			repoChef.save(chef);
			return chef;
		}
		
		public Chef modifica(Chef chef) {
			if(!repoChef.existsById(chef.getId())) {
				throw new EntityNotFoundException("Chef inesistente");
			}
			repoChef.save(chef);
			return chef;
		}
		
		public Chef cercaPerId(Long id) {
			if(!repoChef.existsById(id)) {
				throw new EntityNotFoundException("Id inesistente");
			}
			
			return repoChef.findById(id).get();
		}
		
		public String eliminaPerId(Long id) {
			if(!repoChef.existsById(id)) {
				throw new EntityNotFoundException("Id inesistente");
			}
			repoChef.deleteById(id);
			return "Ristorante eliminato";
		}
		
		public List<Chef> cercaTutti(){
			
			return repoChef.findAll();
		}
}
