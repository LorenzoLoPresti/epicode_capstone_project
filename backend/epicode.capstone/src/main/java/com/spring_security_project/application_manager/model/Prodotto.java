package com.spring_security_project.application_manager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_documento_viaggio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Prodotto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private CategoriaProdotto categoria;
	@Column(nullable = false)
	private Double prezzo;
	@ManyToOne
	@JsonIgnore
	private Chef chef;
	
	public Prodotto(String name, CategoriaProdotto categoria, Double prezzo, Chef chef) {
		super();
		this.name = name;
		this.categoria = categoria;
		this.prezzo = prezzo;
		this.chef = chef;
	}
	
	
}
