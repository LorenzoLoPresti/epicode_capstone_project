package com.spring_security_project.application_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_security_project.application_manager.model.Piatto;

public interface PiattoRepository extends JpaRepository<Piatto, Long> {
	
}
