package com.spring_security_project.application_manager.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_security_project.application_manager.model.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
	
}
