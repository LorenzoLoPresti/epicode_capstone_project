package com.spring_security_project.application_manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring_security_project.application_manager.model.Piatto;
import com.spring_security_project.application_manager.repository.PiattoRepository;
import com.spring_security_project.application_manager.repository.ProdottoRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PiattoService {
	
	@Autowired PiattoRepository repoPiatto;
	@Autowired ProdottoRepository repoProdotto;
	
	public Piatto salva(Piatto piatto) {
	
		repoPiatto.save(piatto);
		return piatto;
	}
	
	public Piatto modifica(Piatto piatto) {
		if(!repoProdotto.existsById(piatto.getId())) {
			throw new EntityNotFoundException("Piatto inesistente");
		}
		repoPiatto.save(piatto);
		return piatto;
	}
	
	public Piatto cercaPerId(Long id) {
		if(!repoProdotto.existsById(id)) {
			throw new EntityNotFoundException("Id inesistente");
		}
		
		return repoPiatto.findById(id).get();
	}
	
	public String eliminaPerId(Long id) {
		if(!repoProdotto.existsById(id)) {
			throw new EntityNotFoundException("Id inesistente");
		}
		repoPiatto.deleteById(id);
		return "Ristorante eliminato";
	}
	
	public List<Piatto> cercaTutti(){
		
		return repoPiatto.findAll();
	}
}
