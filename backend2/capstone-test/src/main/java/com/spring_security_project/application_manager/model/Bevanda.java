package com.spring_security_project.application_manager.model;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

@Entity
@Table(name = "bevande")
@NoArgsConstructor
@AllArgsConstructor
public class Bevanda extends Prodotto {
	
	@Enumerated(EnumType.STRING)
	private TipoBevanda tipoBevanda;
	

	
	public TipoBevanda getTipoBevanda() {
		return tipoBevanda;
	}
	


	public void setTipoBevanda(TipoBevanda tipoBevanda) {
		this.tipoBevanda = tipoBevanda;
	}
	

	
	

	@Override
	public String toString() {
		return "Bevanda [id=" + getId() +  ", tipoBevanda=" + getTipoBevanda() + ", nome=" + getName()
				+ ", categoria)=" + getCategoria() + ", prezzo=" + getPrezzo() + "]";
	}


	public Bevanda(String name, CategoriaProdotto categoria, Double prezzo, String descrizione, Menu menu, TipoBevanda tipoBevanda) {
		super(name, categoria, prezzo, descrizione, menu);
		this.tipoBevanda = tipoBevanda;

	}

}
