package com.spring_security_project.application_manager.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.spring_security_project.application_manager.model.CategoriaProdotto;
import com.spring_security_project.application_manager.model.Chef;
import com.spring_security_project.application_manager.model.Menu;
import com.spring_security_project.application_manager.model.Piatto;
import com.spring_security_project.application_manager.model.TipoCottura;

@Configuration
public class PiattoConfig {
	
	@Bean
	@Scope("prototype")
	public Piatto creaPiatto(String name, CategoriaProdotto categoria, Double prezzo,  String descrizione, Menu menu, TipoCottura tipoCottura, Integer tempo) {
		return new Piatto(name,categoria, prezzo, descrizione, menu, tipoCottura, tempo);
	}
}
