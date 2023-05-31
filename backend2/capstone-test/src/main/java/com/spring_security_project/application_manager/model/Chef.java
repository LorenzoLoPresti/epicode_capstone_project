package com.spring_security_project.application_manager.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chef {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private CategoriaChef categoria;
	@ManyToOne(cascade = CascadeType.MERGE)
	@JsonIgnore
	private Ristorante ristoranteAssociato;
	private double tariffaOraria;
	private String immagineProfilo;
	private String immagineCucina;
	private String descrizioneChef;
	@OneToMany(fetch = FetchType.EAGER)
	@JsonIgnoreProperties
	private List<Menu> listaMenu;
	
	public Chef(String name, CategoriaChef categoria, Ristorante ristoranteAssociato, Integer tariffaOraria) {
		super();
		this.name = name;
		this.categoria = categoria;
		this.ristoranteAssociato = ristoranteAssociato;
		this.tariffaOraria = tariffaOraria;
	}
	
	
}
