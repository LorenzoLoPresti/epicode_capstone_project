package com.spring_security_project.application_manager.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.spring_security_project.application_manager.model.Bevanda;
import com.spring_security_project.application_manager.model.CategoriaProdotto;
import com.spring_security_project.application_manager.model.Chef;
import com.spring_security_project.application_manager.model.Menu;
import com.spring_security_project.application_manager.model.Piatto;
import com.spring_security_project.application_manager.model.TipoBevanda;
import com.spring_security_project.application_manager.model.TipoCottura;

@Configuration
public class BevandaConfiguration {
	
	@Bean
	@Scope("prototype")
	public Bevanda creaBevanda(String name, CategoriaProdotto categoria, Double prezzo,String descrizione, Menu menu, TipoBevanda tipoBevanda) {
		return new Bevanda(name,categoria, prezzo , descrizione, menu, tipoBevanda);
	}
}
