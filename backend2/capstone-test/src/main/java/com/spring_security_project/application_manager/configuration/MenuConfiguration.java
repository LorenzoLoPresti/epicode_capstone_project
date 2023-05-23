package com.spring_security_project.application_manager.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.spring_security_project.application_manager.model.Chef;
import com.spring_security_project.application_manager.model.Menu;

@Configuration
public class MenuConfiguration {

	@Bean
	@Scope("prototype")
	public Menu creaMenu(Chef chef) {
		return new Menu(chef);
	}
}
