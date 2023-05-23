package com.spring_security_project.application_manager.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.spring_security_project.application_manager.model.CategoriaChef;
import com.spring_security_project.application_manager.model.Chef;
import com.spring_security_project.application_manager.model.Ristorante;

@Configuration
public class ChefConfiguration {

	@Bean
	@Scope("prototype")
	public Chef creaChef(String name, CategoriaChef categoria, Ristorante ristoranteAssociato, Integer tariffa) {
		return new Chef(name, categoria, ristoranteAssociato, tariffa);
	}
}
