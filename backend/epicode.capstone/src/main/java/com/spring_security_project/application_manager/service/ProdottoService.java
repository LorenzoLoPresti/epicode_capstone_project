package com.spring_security_project.application_manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring_security_project.application_manager.model.Prodotto;
import com.spring_security_project.application_manager.repository.ProdottoRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ProdottoService {

	@Autowired ProdottoRepository repoProdotto;
	
	//CRUD
	
		public Prodotto salva(Prodotto prodotto) {
		
			repoProdotto.save(prodotto);
			return prodotto;
		}
		
		public Prodotto modifica(Prodotto prodotto) {
			if(!repoProdotto.existsById(prodotto.getId())) {
				throw new EntityNotFoundException("Prodotto inesistente");
			}
			repoProdotto.save(prodotto);
			return prodotto;
		}
		
		public Prodotto cercaPerId(Long id) {
			if(!repoProdotto.existsById(id)) {
				throw new EntityNotFoundException("Id inesistente");
			}
			
			return repoProdotto.findById(id).get();
		}
		
		public String eliminaPerId(Long id) {
			if(!repoProdotto.existsById(id)) {
				throw new EntityNotFoundException("Id inesistente");
			}
			repoProdotto.deleteById(id);
			return "Ristorante eliminato";
		}
		
		public List<Prodotto> cercaTutti(){
		
			return repoProdotto.findAll();
		}
}
