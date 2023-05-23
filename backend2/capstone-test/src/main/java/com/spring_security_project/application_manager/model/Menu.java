package com.spring_security_project.application_manager.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lista_menu")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Menu {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@OneToMany(fetch = FetchType.EAGER)
	@JsonIgnoreProperties
	List<Prodotto> selezione;
	@ManyToOne
	@JsonIgnore
	Chef chef;
	
	public Menu(Chef chef) {
		super();
		this.chef = chef;
	}

	@Override
	public String toString() {
		return "Menu [id=" + id + ", selezione=" + selezione + "]";
	}
	
	
	
}
