package com.spring_security_project.application_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_security_project.application_manager.model.Prodotto;

public interface ProdottoRepository extends JpaRepository<Prodotto, Long> {

	public boolean existsByName(String string);
}
