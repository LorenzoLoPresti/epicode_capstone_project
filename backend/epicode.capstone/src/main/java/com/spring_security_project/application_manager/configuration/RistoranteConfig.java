package com.spring_security_project.application_manager.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.spring_security_project.application_manager.model.Ristorante;

@Configuration
public class RistoranteConfig {

	@Bean
	@Scope("prototype")
	public Ristorante creaRistorante(String name, String citta, String telefono, String immagine) {
		return new Ristorante(name, citta, telefono, immagine);
	}
}
