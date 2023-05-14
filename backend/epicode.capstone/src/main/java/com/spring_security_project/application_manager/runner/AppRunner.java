package com.spring_security_project.application_manager.runner;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.spring_security_project.application_manager.model.CategoriaChef;
import com.spring_security_project.application_manager.model.CategoriaProdotto;
import com.spring_security_project.application_manager.model.Chef;
import com.spring_security_project.application_manager.model.Piatto;
import com.spring_security_project.application_manager.model.Ristorante;
import com.spring_security_project.application_manager.model.TipoCottura;
import com.spring_security_project.application_manager.repository.RistoranteRepository;
import com.spring_security_project.application_manager.service.BevandaService;
import com.spring_security_project.application_manager.service.ChefService;
import com.spring_security_project.application_manager.service.PiattoService;
import com.spring_security_project.application_manager.service.ProdottoService;
import com.spring_security_project.application_manager.service.RistoranteService;

@Component
public class AppRunner implements ApplicationRunner {

	@Autowired
	RistoranteService serviceRistorante;
	@Autowired
	ProdottoService serviceProdotto;
	@Autowired
	PiattoService servicePiatto;
	@Autowired
	BevandaService serviceBevanda;
	@Autowired
	ChefService serviceChef;

	@Autowired
	ObjectProvider<Ristorante> ristorante;
	@Autowired
	ObjectProvider<Chef> chef;
	@Autowired
	ObjectProvider<Piatto> piatto;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("AppRun...");
		creaDb();

	}

	public void creaDb() {
		if (serviceRistorante.cercaTutti().size() == 0 && serviceChef.cercaTutti().size() == 0
				&& serviceProdotto.cercaTutti().size() == 0) {
//			serviceRistorante.salva(ristorante.getObject("Ristorante La Pergola", "Roma", "06 3509 2152", "/../assets/ristoranti/la_pergola_roma.jpg"));
//			serviceRistorante.salva(ristorante.getObject("Ristorante La Pergola", "Roma", "06 3509 2152", "/src/assets/ristoranti/aroma_roma.jpg"));
//			serviceRistorante.salva(ristorante.getObject("Ristorante Aroma", "Roma", "06 9761 5109", "/src/assets/ristoranti/aroma_roma.jpg"));
//			serviceRistorante.salva(ristorante.getObject("Ristorante Mirabelle", "Roma", "06 4216 8838", "/src/assets/ristoranti/aroma_roma.jpg"));
			
			serviceRistorante.salva(ristorante.getObject("La Pergola", "Roma", "06 3509 2152", "/src/assets/ristoranti/la_pergola_roma.jpg"));
			serviceRistorante.salva(ristorante.getObject("Aroma", "Roma", "06 9761 5109", "/src/assets/ristoranti/aroma_roma.jpg"));
			serviceRistorante.salva(ristorante.getObject("Mirabelle", "Roma", "06 4216 8838", "/src/assets/ristoranti/mirabelle_roma.jpg"));

			Ristorante r1 = serviceRistorante.cercaPerId(1l);
			Ristorante r2 = serviceRistorante.cercaPerId(2l);
			Ristorante r3 = serviceRistorante.cercaPerId(3l);

			serviceChef.salva(
					chef.getObject("Giancarlo Esposito", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(1l)));
			serviceChef.salva(chef.getObject("Walter White", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(2l)));
			serviceChef
					.salva(chef.getObject("Jesse Pinkman", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(3l)));

			Chef c1 = serviceChef.cercaPerId(1l);
			Chef c2 = serviceChef.cercaPerId(2l);
			Chef c3 = serviceChef.cercaPerId(3l);

			r1.getListaChef().add(c1);
			serviceRistorante.modifica(r1);
			r2.getListaChef().add(c2);
			serviceRistorante.modifica(r2);
			r3.getListaChef().add(c3);
			serviceRistorante.modifica(r3);

			servicePiatto.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00, c1, TipoCottura.COTTO));
			servicePiatto.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00, c1, TipoCottura.COTTO));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00, c1, TipoCottura.COTTO));

			servicePiatto.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00, c2, TipoCottura.COTTO));
			servicePiatto.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00, c2, TipoCottura.COTTO));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00, c2, TipoCottura.COTTO));

			servicePiatto.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00, c3, TipoCottura.COTTO));
			servicePiatto.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00, c3, TipoCottura.COTTO));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00, c3, TipoCottura.COTTO));

			Piatto p1 = servicePiatto.cercaPerId(1l);
			Piatto p2 = servicePiatto.cercaPerId(2l);
			Piatto p3 = servicePiatto.cercaPerId(3l);
			Piatto p4 = servicePiatto.cercaPerId(4l);
			Piatto p5 = servicePiatto.cercaPerId(5l);
			Piatto p6 = servicePiatto.cercaPerId(6l);
			Piatto p7 = servicePiatto.cercaPerId(7l);
			Piatto p8 = servicePiatto.cercaPerId(8l);
			Piatto p9 = servicePiatto.cercaPerId(9l);

			c1.getListaProdotti().add(p1);
			c1.getListaProdotti().add(p2);
			c1.getListaProdotti().add(p3);
			serviceChef.modifica(c1);
			c2.getListaProdotti().add(p4);
			c2.getListaProdotti().add(p5);
			c2.getListaProdotti().add(p6);
			serviceChef.modifica(c2);
			c3.getListaProdotti().add(p7);
			c3.getListaProdotti().add(p8);
			c3.getListaProdotti().add(p9);
			serviceChef.modifica(c3);

		}
	}
}
