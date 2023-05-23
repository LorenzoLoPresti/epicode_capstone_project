package com.spring_security_project.application_manager.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

@Entity
@Table(name = "piatti")
@NoArgsConstructor
@AllArgsConstructor
public class Piatto extends Prodotto {
	

	private TipoCottura tipoCottura;

	
	public TipoCottura getTipoCottura() {
		return tipoCottura;
	}

	public void setTipoCottura (TipoCottura tipoCottura) {
		this.tipoCottura = tipoCottura;
	}

	@Override
	public String toString() {
		return "Piatto [id=" + getId() +  ", tipoCottura=" + getTipoCottura() + ", nome=" + getName()
				+ ", categoria)=" + getCategoria() + ", prezzo=" + getPrezzo() + "]";
	}

	public Piatto(String name, CategoriaProdotto categoria, Double prezzo, Chef chef, TipoCottura tipoCottura) {
		super(name, categoria, prezzo, chef);
		setTipoCottura(tipoCottura);
	}
	
	

}
