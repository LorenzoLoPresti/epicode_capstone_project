package com.spring_security_project.application_manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring_security_project.application_manager.model.Ristorante;
import com.spring_security_project.application_manager.repository.RistoranteRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class RistoranteService {

	@Autowired RistoranteRepository repoRistorante;
	
	
	//CRUD
	
	public Ristorante salva(Ristorante ristorante) {
		if(repoRistorante.existsByName(ristorante.getName())) {
			throw new EntityExistsException("Nome esistente");
		}
		repoRistorante.save(ristorante);
		return ristorante;
	}
	
	public Ristorante modifica(Ristorante ristorante) {
		if(!repoRistorante.existsById(ristorante.getId())) {
			throw new EntityNotFoundException("Ristorante inesistente");
		}
		repoRistorante.save(ristorante);
		return ristorante;
	}
	
	public Ristorante cercaPerId(Long id) {
		if(!repoRistorante.existsById(id)) {
			throw new EntityNotFoundException("Id inesistente");
		}
		
		return repoRistorante.findById(id).get();
	}
	
	public String eliminaPerId(Long id) {
		if(!repoRistorante.existsById(id)) {
			throw new EntityNotFoundException("Id inesistente");
		}
		repoRistorante.deleteById(id);
		return "Ristorante eliminato";
	}
	
	public List<Ristorante> cercaTutti(){
		return repoRistorante.findAll();
	}
	
	public List<Ristorante> cercaPerCitta(String citta){
		return repoRistorante.findByCitta(citta);
	}
}
