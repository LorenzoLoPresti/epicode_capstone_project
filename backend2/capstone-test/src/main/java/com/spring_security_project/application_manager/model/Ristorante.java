package com.spring_security_project.application_manager.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ristoranti")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ristorante {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, unique = true)
	private String name;
	@Column(nullable = false)
	private String citta;
	@Column(nullable = false)
	private String telefono;
	private String immagine;
	private String indirizzo;
	private String descrizione;
	private String descrizione2;
	private String menu_img;
	@OneToMany(fetch = FetchType.EAGER)
	@JsonIgnoreProperties
	private List<Chef> listaChef = new ArrayList<Chef>();
	
	public Ristorante(String name, String citta, String telefono, String immagine) {
		super();
		this.name = name;
		this.citta = citta;
		this.telefono = telefono;
		this.immagine = immagine;
	}
	
	public Ristorante(String name, String citta, String telefono, String immagine, String indirizzo) {
		super();
		this.name = name;
		this.citta = citta;
		this.telefono = telefono;
		this.immagine = immagine;
	}

//	@Override
//	public String toString() {
//		return "Ristorante [id=" + id + ", name=" + name + ", citta=" + citta + "]";
//	}
//	
	
	
	
}
