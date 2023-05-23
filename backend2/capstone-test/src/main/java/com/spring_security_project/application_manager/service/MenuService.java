package com.spring_security_project.application_manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring_security_project.application_manager.model.Bevanda;
import com.spring_security_project.application_manager.model.Chef;
import com.spring_security_project.application_manager.model.Menu;
import com.spring_security_project.application_manager.repository.BevandaRepository;
import com.spring_security_project.application_manager.repository.ChefRepository;
import com.spring_security_project.application_manager.repository.MenuRepository;
import com.spring_security_project.application_manager.repository.ProdottoRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class MenuService {
	
	@Autowired MenuRepository repoMenu;
	@Autowired ChefService serviceChef;
	
	// CRUD
	
	public Menu salva(Menu menu) {
	
		repoMenu.save(menu);
		return menu;
	}
	
	public Menu modifica(Menu menu) {
		if(!repoMenu.existsById(menu.getId())) {
			throw new EntityNotFoundException("Bevanda inesistente");
		}
		repoMenu.save(menu);
		return menu;
	}
	
	public Menu cercaPerId(Long id) {
		if(!repoMenu.existsById(id)) {
			throw new EntityNotFoundException("Id inesistente");
		}
		
		return repoMenu.findById(id).get();
	}
	
	public String eliminaPerId(Long id) {
		if(!repoMenu.existsById(id)) {
			throw new EntityNotFoundException("Id inesistente");
		}
		repoMenu.deleteById(id);
		return "Ristorante eliminato";
	}
	
	public List<Menu> cercaTutti(){
	
		return repoMenu.findAll();
	}
	
	public List<Menu> cercaMenuPerIdChef(Long id){
		Chef c = serviceChef.cercaPerId(id);
		return c.getListaMenu();
	}
}
