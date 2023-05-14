package com.spring_security_project.application_manager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_security_project.application_manager.model.Ristorante;

public interface RistoranteRepository extends JpaRepository<Ristorante, Long> {

	public boolean existsByName(String string);
	public boolean existsByCitta(String citta);
	public List<Ristorante> findByCitta(String citta);
}
