package com.spring_security_project.application_manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring_security_project.application_manager.model.Bevanda;
import com.spring_security_project.application_manager.repository.BevandaRepository;
import com.spring_security_project.application_manager.repository.ProdottoRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class BevandaService {
	
	@Autowired BevandaRepository repoBevanda;
	@Autowired ProdottoRepository repoProdotto;
	
	// CRUD
	
	public Bevanda salva(Bevanda bevanda) {
	
		repoBevanda.save(bevanda);
		return bevanda;
	}
	
	public Bevanda modifica(Bevanda bevanda) {
		if(!repoProdotto.existsById(bevanda.getId())) {
			throw new EntityNotFoundException("Bevanda inesistente");
		}
		repoBevanda.save(bevanda);
		return bevanda;
	}
	
	public Bevanda cercaPerId(Long id) {
		if(!repoProdotto.existsById(id)) {
			throw new EntityNotFoundException("Id inesistente");
		}
		
		return repoBevanda.findById(id).get();
	}
	
	public String eliminaPerId(Long id) {
		if(!repoProdotto.existsById(id)) {
			throw new EntityNotFoundException("Id inesistente");
		}
		repoBevanda.deleteById(id);
		return "Ristorante eliminato";
	}
	
	public List<Bevanda> cercaTutti(){
	
		return repoBevanda.findAll();
	}
}
