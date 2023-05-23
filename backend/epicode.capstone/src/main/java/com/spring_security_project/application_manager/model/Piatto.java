package com.spring_security_project.application_manager.model;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

@Entity
@Table(name = "piatti")
@NoArgsConstructor
@AllArgsConstructor
public class Piatto extends Prodotto {
	
	@Enumerated(EnumType.STRING)
	private TipoCottura tipoCottura;
	private Integer tempoDiPreparazione;
	
	public TipoCottura getTipoCottura() {
		return tipoCottura;
	}
	
	public Integer getTempoDiPreparazione() {
		return tempoDiPreparazione;
	}

	public void setTipoCottura (TipoCottura tipoCottura) {
		this.tipoCottura = tipoCottura;
	}
	
	public void setTempoDiPreparazione (Integer tempo) {
		this.tempoDiPreparazione = tempo;
	}

	@Override
	public String toString() {
		return "Piatto [id=" + getId() +  ", tipoCottura=" + getTipoCottura() + ", tempoDiPreparazione=" + getTempoDiPreparazione() +", nome=" + getName()
				+ ", categoria)=" + getCategoria() + ", prezzo=" + getPrezzo() + "]";
	}

	public Piatto(String name, CategoriaProdotto categoria, Double prezzo, String descrizione, Menu menu, TipoCottura tipoCottura, Integer tempo) {
		super(name, categoria, prezzo, descrizione, menu);
		setTipoCottura(tipoCottura);
		setTempoDiPreparazione(tempo);
	}
	
	

}
