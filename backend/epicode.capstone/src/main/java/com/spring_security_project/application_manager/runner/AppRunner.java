package com.spring_security_project.application_manager.runner;

import java.util.List;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.spring_security_project.application_manager.model.CategoriaChef;
import com.spring_security_project.application_manager.model.CategoriaProdotto;
import com.spring_security_project.application_manager.model.Chef;
import com.spring_security_project.application_manager.model.Menu;
import com.spring_security_project.application_manager.model.Piatto;
import com.spring_security_project.application_manager.model.Ristorante;
import com.spring_security_project.application_manager.model.TipoCottura;
import com.spring_security_project.application_manager.repository.RistoranteRepository;
import com.spring_security_project.application_manager.service.BevandaService;
import com.spring_security_project.application_manager.service.ChefService;
import com.spring_security_project.application_manager.service.MenuService;
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
	MenuService serviceMenu;

	@Autowired
	ObjectProvider<Ristorante> ristorante;
	@Autowired
	ObjectProvider<Chef> chef;
	@Autowired
	ObjectProvider<Piatto> piatto;
	@Autowired
	ObjectProvider<Menu> menu;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("AppRun...");
		creaDb();
		System.out.println(serviceMenu.cercaMenuPerIdChef(1l));
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
			r1.setDescrizione("Un panorama unico della Città Eterna si apre"
					+ " alla vista degli ospiti di uno dei ristoranti più belli del mondo."
					);
			r1.setMenu_img("/src/assets/menu/la_pergola.jpg");
			r1.setIndirizzo("Via Alberto Cadlolo 101");
			serviceRistorante.modifica(r1);
			Ristorante r2 = serviceRistorante.cercaPerId(2l);
			r2.setDescrizione(" Le ricette gourmet rielaborano i sapori e i gusti della tradizione italiana,"
					+ " mentre la cantina selezionata dal Sommelier ha un’impronta molto internazionale "
					+ "con un focus particolare sugli champagne e una selezione di vini di oltre 600 etichette.");
			r2.setMenu_img("/src/assets/menu/aroma.jpg");
			r2.setIndirizzo("Via Labicana 125");
			serviceRistorante.modifica(r2);
			Ristorante r3 = serviceRistorante.cercaPerId(3l);
			r3.setDescrizione(" Una terrazza gourmet con una vista che partendo da Villa Medici e Trinità dei Monti arriva fino"
					+ " a San Pietro e al Gianicolo. A fare da cornice a questo meraviglioso scorcio ci sono un'insuperabile accoglienza"
					+ " e una cucina raffinata.");
			r3.setMenu_img("/src/assets/menu/mirabelle.jpg");
			r3.setIndirizzo("Via di Porta Pinciana 14");
			serviceRistorante.modifica(r3);
			
			r1 = serviceRistorante.cercaPerId(1l);
			r2 = serviceRistorante.cercaPerId(2l);
			r3 = serviceRistorante.cercaPerId(3l);

			serviceChef.salva(
					chef.getObject("Giancarlo Esposito", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(1l), 45));
			serviceChef.salva(chef.getObject("Walter White", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(2l), 50));
			serviceChef
					.salva(chef.getObject("Jesse Pinkman", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(3l), 20));
			serviceChef.salva(
					chef.getObject("Carlo Cracco", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(1l), 40));
			serviceChef.salva(chef.getObject("Bruno Barbieri", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(2l), 35));
			serviceChef
					.salva(chef.getObject("Alessandro Borghese", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(3l), 25));

			Chef c1 = serviceChef.cercaPerId(1l);
			Chef c2 = serviceChef.cercaPerId(2l);
			Chef c3 = serviceChef.cercaPerId(3l);
			Chef c4 = serviceChef.cercaPerId(4l);
			Chef c5 = serviceChef.cercaPerId(5l);
			Chef c6 = serviceChef.cercaPerId(6l);
			
			serviceMenu.salva(menu.getObject(c1));
			serviceMenu.salva(menu.getObject(c2));
			serviceMenu.salva(menu.getObject(c3));
			serviceMenu.salva(menu.getObject(c4));
			serviceMenu.salva(menu.getObject(c5));
			serviceMenu.salva(menu.getObject(c6));
			
			Menu m1 = serviceMenu.cercaPerId(1l);
			Menu m2 = serviceMenu.cercaPerId(2l);
			Menu m3 = serviceMenu.cercaPerId(3l);
			Menu m4 = serviceMenu.cercaPerId(4l);
			Menu m5 = serviceMenu.cercaPerId(5l);
			Menu m6 = serviceMenu.cercaPerId(6l);

			c1.getListaMenu().add(m1);
			serviceChef.modifica(c1);
			c2.getListaMenu().add(m2);
			serviceChef.modifica(c2);
			c3.getListaMenu().add(m3);
			serviceChef.modifica(c3);
			c4.getListaMenu().add(m4);
			serviceChef.modifica(c4);
			c5.getListaMenu().add(m5);
			serviceChef.modifica(c5);
			c6.getListaMenu().add(m6);
			serviceChef.modifica(c6);
			
			c1 = serviceChef.cercaPerId(1l);
			c2 = serviceChef.cercaPerId(2l);
			c3 = serviceChef.cercaPerId(3l);
			c4 = serviceChef.cercaPerId(4l);
			c5 = serviceChef.cercaPerId(5l);
			c6 = serviceChef.cercaPerId(6l);

//			List<Chef> listaChef1 = r1.getListaChef();
			r1.getListaChef().add(c1);
			r1.getListaChef().add(c4);
			serviceRistorante.modifica(r1);
			r2.getListaChef().add(c2);
			r2.getListaChef().add(c5);
			serviceRistorante.modifica(r2);
			r3.getListaChef().add(c3);
			r3.getListaChef().add(c6);
			serviceRistorante.modifica(r3);
//			r1.getListaChef().add(c4);
//			serviceRistorante.modifica(r1);
//			r2.getListaChef().add(c5);
//			serviceRistorante.modifica(r2);
//			r3.getListaChef().add(c6);
//			serviceRistorante.modifica(r3);
			
			
			

			servicePiatto.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00, m1, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00, m1, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00, m1, TipoCottura.COTTO, 25));

			servicePiatto.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00, m2, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00, m2, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00, m2, TipoCottura.COTTO, 25));

			servicePiatto.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00, m3, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00, m3, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00, m3, TipoCottura.COTTO, 25));
			
			servicePiatto.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00, m4, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00, m4, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00, m4, TipoCottura.COTTO, 25));

			servicePiatto.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00, m5, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00, m5, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00, m5, TipoCottura.COTTO, 25));

			servicePiatto.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00, m6, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00, m6, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00, m6, TipoCottura.COTTO, 25));

			Piatto p1 = servicePiatto.cercaPerId(1l);
			Piatto p2 = servicePiatto.cercaPerId(2l);
			Piatto p3 = servicePiatto.cercaPerId(3l);
			Piatto p4 = servicePiatto.cercaPerId(4l);
			Piatto p5 = servicePiatto.cercaPerId(5l);
			Piatto p6 = servicePiatto.cercaPerId(6l);
			Piatto p7 = servicePiatto.cercaPerId(7l);
			Piatto p8 = servicePiatto.cercaPerId(8l);
			Piatto p9 = servicePiatto.cercaPerId(9l);
			Piatto p10 = servicePiatto.cercaPerId(10l);
			Piatto p11 = servicePiatto.cercaPerId(11l);
			Piatto p12 = servicePiatto.cercaPerId(12l);
			Piatto p13 = servicePiatto.cercaPerId(13l);
			Piatto p14 = servicePiatto.cercaPerId(14l);
			Piatto p15 = servicePiatto.cercaPerId(15l);
			Piatto p16 = servicePiatto.cercaPerId(16l);
			Piatto p17 = servicePiatto.cercaPerId(17l);
			Piatto p18 = servicePiatto.cercaPerId(18l);

			m1.getSelezione().add(p1);
			m1.getSelezione().add(p2);
			m1.getSelezione().add(p3);
			serviceMenu.modifica(m1);
			m2.getSelezione().add(p4);
			m2.getSelezione().add(p5);
			m2.getSelezione().add(p6);
			serviceMenu.modifica(m2);
			m3.getSelezione().add(p7);
			m3.getSelezione().add(p8);
			m3.getSelezione().add(p9);
			serviceMenu.modifica(m3);
			m4.getSelezione().add(p10);
			m4.getSelezione().add(p11);
			m4.getSelezione().add(p12);
			serviceMenu.modifica(m4);
			m5.getSelezione().add(p13);
			m5.getSelezione().add(p14);
			m5.getSelezione().add(p15);
			serviceMenu.modifica(m5);
			m6.getSelezione().add(p16);
			m6.getSelezione().add(p17);
			m6.getSelezione().add(p18);
			serviceMenu.modifica(m6);
			
//			c4.getListaProdotti().add(p1);
//			c4.getListaProdotti().add(p2);
//			c4.getListaProdotti().add(p3);
//			serviceChef.modifica(c4);
//			c5.getListaProdotti().add(p4);
//			c5.getListaProdotti().add(p5);
//			c5.getListaProdotti().add(p6);
//			serviceChef.modifica(c5);
//			c6.getListaProdotti().add(p7);
//			c6.getListaProdotti().add(p8);
//			c6.getListaProdotti().add(p9);
//			serviceChef.modifica(c6);

		}
	}
}
