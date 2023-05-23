package com.spring_security_project.application_manager.runner;

import java.util.List;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.spring_security_project.application_manager.model.Bevanda;
import com.spring_security_project.application_manager.model.CategoriaChef;
import com.spring_security_project.application_manager.model.CategoriaProdotto;
import com.spring_security_project.application_manager.model.Chef;
import com.spring_security_project.application_manager.model.Menu;
import com.spring_security_project.application_manager.model.Piatto;
import com.spring_security_project.application_manager.model.Ristorante;
import com.spring_security_project.application_manager.model.TipoBevanda;
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
	ObjectProvider<Bevanda> bevanda;
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

			serviceRistorante.salva(ristorante.getObject("La Pergola", "Roma", "06 3509 2152",
					"/src/assets/ristoranti/la_pergola_roma.jpg"));
			serviceRistorante.salva(
					ristorante.getObject("Aroma", "Roma", "06 9761 5109", "/src/assets/ristoranti/aroma_roma.jpg"));
			serviceRistorante.salva(ristorante.getObject("Mirabelle", "Roma", "06 4216 8838",
					"/src/assets/ristoranti/mirabelle_roma.jpg"));

			Ristorante r1 = serviceRistorante.cercaPerId(1l);
			r1.setDescrizione("Un panorama unico della Città Eterna si apre"
					+ " alla vista degli ospiti di uno dei ristoranti più belli del mondo.");
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
			r3.setDescrizione(
					" Una terrazza gourmet con una vista che partendo da Villa Medici e Trinità dei Monti arriva fino"
							+ " a San Pietro e al Gianicolo. A fare da cornice a questo meraviglioso scorcio ci sono un'insuperabile accoglienza"
							+ " e una cucina raffinata.");
			r3.setMenu_img("/src/assets/menu/mirabelle.jpg");
			r3.setIndirizzo("Via di Porta Pinciana 14");
			serviceRistorante.modifica(r3);

			r1 = serviceRistorante.cercaPerId(1l);
			r2 = serviceRistorante.cercaPerId(2l);
			r3 = serviceRistorante.cercaPerId(3l);

			serviceChef.salva(chef.getObject("Gus Fring", CategoriaChef.CARNE, serviceRistorante.cercaPerId(1l), 45));
			serviceChef.salva(
					chef.getObject("Walter White", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(2l), 50));
			serviceChef
					.salva(chef.getObject("Jesse Pinkman", CategoriaChef.PESCE, serviceRistorante.cercaPerId(3l), 20));
			serviceChef.salva(
					chef.getObject("Gale Boetticher", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(1l), 40));
			serviceChef
					.salva(chef.getObject("Bruno Barbieri", CategoriaChef.CARNE, serviceRistorante.cercaPerId(2l), 35));
			serviceChef.salva(
					chef.getObject("Giorgio Locatelli", CategoriaChef.PESCE, serviceRistorante.cercaPerId(3l), 25));

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
			serviceMenu.salva(menu.getObject(c1));

			Menu m1 = serviceMenu.cercaPerId(1l);
			Menu m2 = serviceMenu.cercaPerId(2l);
			Menu m3 = serviceMenu.cercaPerId(3l);
			Menu m4 = serviceMenu.cercaPerId(4l);
			Menu m5 = serviceMenu.cercaPerId(5l);
			Menu m6 = serviceMenu.cercaPerId(6l);
			Menu m7 = serviceMenu.cercaPerId(7l);

			c1.getListaMenu().add(m1);
			c1.getListaMenu().add(m7);
			c1.setImmagineProfilo("/src/assets/chef/fring_posa.jpg");
			c1.setImmagineCucina("/src/assets/chef/fring_cucina.jpg");
			serviceChef.modifica(c1);
			c2.getListaMenu().add(m2);
			c2.setImmagineProfilo("/src/assets/chef/white_posa.jpg");
			c2.setImmagineCucina("/src/assets/chef/white_cucina.jpg");
			serviceChef.modifica(c2);
			c3.getListaMenu().add(m3);
			c3.setImmagineProfilo("/src/assets/chef/pinkman_posa.jpg");
			c3.setImmagineCucina("/src/assets/chef/pinkman_cucina.jpg");
			serviceChef.modifica(c3);
			c4.getListaMenu().add(m4);
			c4.setImmagineProfilo("/src/assets/chef/gale_posa.jpg");
			c4.setImmagineCucina("/src/assets/chef/gale_cucina.jpg");
			serviceChef.modifica(c4);
			c5.getListaMenu().add(m5);
			c5.setImmagineProfilo("/src/assets/chef/barbieri_posa.jpg");
			c5.setImmagineCucina("/src/assets/chef/barbieri_cucina.jpg");
			serviceChef.modifica(c5);
			c6.getListaMenu().add(m6);
			c6.setImmagineProfilo("/src/assets/chef/locatelli_posa.jpg");
			c6.setImmagineCucina("/src/assets/chef/locatelli_cucina.jpg");
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

			servicePiatto
					.salva(piatto.getObject("Gnocchi al ragù di pollo", CategoriaProdotto.PRIMO, 14.00, "", m1, TipoCottura.COTTO, 25));
			servicePiatto
					.salva(piatto.getObject("Filetto di manzo alla griglia con salsa al vino rosso", CategoriaProdotto.SECONDO, 17.00,"", m1, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Panna cotta con coulis di frutti di bosco", CategoriaProdotto.DOLCE, 17.00,"", m1, TipoCottura.COTTO, 25));

			servicePiatto
					.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00,"", m2, TipoCottura.COTTO, 25));
			servicePiatto
					.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00,"", m2, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00,"", m2, TipoCottura.COTTO, 25));

			servicePiatto
					.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00,"", m3, TipoCottura.COTTO, 25));
			servicePiatto
					.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00,"", m3, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00,"", m3, TipoCottura.COTTO, 25));

			servicePiatto
					.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00,"", m4, TipoCottura.COTTO, 25));
			servicePiatto
					.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00,"", m4, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00,"", m4, TipoCottura.COTTO, 25));

			servicePiatto
					.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00,"", m5, TipoCottura.COTTO, 25));
			servicePiatto
					.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00,"", m5, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00,"", m5, TipoCottura.COTTO, 25));

			servicePiatto
					.salva(piatto.getObject("Carbonara", CategoriaProdotto.PRIMO, 18.00,"", m6, TipoCottura.COTTO, 25));
			servicePiatto
					.salva(piatto.getObject("Amatriciana", CategoriaProdotto.PRIMO, 17.00,"", m6, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Gricia", CategoriaProdotto.PRIMO, 17.00,"", m6, TipoCottura.COTTO, 25));
			
			servicePiatto.salva(piatto.getObject("Insalata di pollo alla Caesar", CategoriaProdotto.ANTIPASTO, 10.00, "",m7, TipoCottura.COTTO, 10));
			servicePiatto.salva(piatto.getObject("Tagliatelle al tartufo nero", CategoriaProdotto.PRIMO, 18.00, "",m7, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Costolette di agnello in crosta di erbette", CategoriaProdotto.SECONDO, 26.00, "",m7, TipoCottura.COTTO, 35));
			servicePiatto.salva(piatto.getObject("Torta al cioccolato fondente con gelato alla vaniglia", CategoriaProdotto.DOLCE, 9.00, "",m7, TipoCottura.COTTO, 10));
//			
			serviceBevanda.salva(bevanda.getObject("Marchese di Villamarina", CategoriaProdotto.BEVANDA, 38.00,					
					"Il vino Marchese di Villamarina è un'eccellenza italiana. Di colore intenso, presenta un bouquet complesso e avvolgente di frutti maturi, spezie e note floreali. In bocca è elegante, con tannini morbidi e una piacevole persistenza",
					m1,
					TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Molvina", CategoriaProdotto.BEVANDA, 45.00,"Il vino Molvina è un'opera d'arte enologica. Colore vivace, aroma fruttato e fresco con accenti floreali. Gusto equilibrato e persistente con una piacevole acidità",
					m2,
					TipoBevanda.ALCOLICA
					));
			serviceBevanda.salva(bevanda.getObject("Leonardo Da Vinci", CategoriaProdotto.BEVANDA, 35.00,
					"Il vino Leonardo Da Vinci è un'opera di maestria enologica. Profondo colore rubino, con intensi aromi di frutti rossi e spezie. In bocca è pieno, armonico e di lunga persistenza.",
					m3,
					TipoBevanda.ALCOLICA
					));
			serviceBevanda.salva(bevanda.getObject("Batasiolo", CategoriaProdotto.BEVANDA, 35.00,
					"Il vino Batasiolo è un'autentica espressione del Piemonte. Colore brillante, con profumi intensi di frutti maturi, spezie e sottobosco. In bocca è strutturato, elegante e persistente, con un equilibrio perfetto tra acidità e tannini.",
					m4,
					TipoBevanda.ALCOLICA
					));
			serviceBevanda.salva(bevanda.getObject("Brunello di Montalcino", CategoriaProdotto.BEVANDA, 41.00,
					"Il Brunello di Montalcino è uno dei vini più rinomati e ammirati in Italia. Prodotto nella regione toscana, presenta un colore rubino intenso e un profilo aromatico complesso con note di frutta rossa, spezie, tabacco e cuoio.",
					m5,
					TipoBevanda.ALCOLICA
					));
			serviceBevanda.salva(bevanda.getObject("Tignanello", CategoriaProdotto.BEVANDA, 174.00,
					"Il Tignanello è un rinomato vino toscano. Di colore intenso, offre un bouquet complesso di frutti rossi, spezie, tabacco e note balsamiche. In bocca è elegante, con tannini vellutati e un'armoniosa acidità.",
					m6,
					TipoBevanda.ALCOLICA
					));
			serviceBevanda.salva(bevanda.getObject("Molvina", CategoriaProdotto.BEVANDA, 45.00,
					"Il vino Molvina è un'opera d'arte enologica. Colore vivace, aroma fruttato e fresco con accenti floreali. Gusto equilibrato e persistente con una piacevole acidità",
					m7,
					TipoBevanda.ALCOLICA
					));
			serviceBevanda.salva(bevanda.getObject("Brunello di Montalcino", CategoriaProdotto.BEVANDA, 45.00,
					"Il Brunello di Montalcino è uno dei vini più rinomati e ammirati in Italia. Prodotto nella regione toscana, presenta un colore rubino intenso e un profilo aromatico complesso con note di frutta rossa, spezie, tabacco e cuoio.",
					m7,
					TipoBevanda.ALCOLICA
					));
//			
//			serviceBevanda.salva(bevanda.getObject("Molvina", CategoriaProdotto.BEVANDA, 45.00, m6, TipoBevanda.ALCOLICA, ""));

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
			Piatto p19 = servicePiatto.cercaPerId(19l);
			Piatto p20 = servicePiatto.cercaPerId(20l);
			Piatto p21 = servicePiatto.cercaPerId(21l);
			Piatto p22 = servicePiatto.cercaPerId(22l);
			

			Bevanda b1 = serviceBevanda.cercaPerId(23l);
			Bevanda b2 = serviceBevanda.cercaPerId(24l);
			Bevanda b3 = serviceBevanda.cercaPerId(25l);
			Bevanda b4 = serviceBevanda.cercaPerId(26l);
			Bevanda b5 = serviceBevanda.cercaPerId(27l);
			Bevanda b6 = serviceBevanda.cercaPerId(28l);
			Bevanda b7 = serviceBevanda.cercaPerId(29l);
			Bevanda b8 = serviceBevanda.cercaPerId(30l);

			m1.getSelezione().add(p1);
			m1.getSelezione().add(p2);
			m1.getSelezione().add(p3);
			m1.getSelezione().add(b1);
			serviceMenu.modifica(m1);
			m2.getSelezione().add(p4);
			m2.getSelezione().add(p5);
			m2.getSelezione().add(p6);
			m2.getSelezione().add(b2);
			serviceMenu.modifica(m2);
			m3.getSelezione().add(p7);
			m3.getSelezione().add(p8);
			m3.getSelezione().add(p9);
			m3.getSelezione().add(b3);
			serviceMenu.modifica(m3);
			m4.getSelezione().add(p10);
			m4.getSelezione().add(p11);
			m4.getSelezione().add(p12);
			m4.getSelezione().add(b4);
			serviceMenu.modifica(m4);
			m5.getSelezione().add(p13);
			m5.getSelezione().add(p14);
			m5.getSelezione().add(p15);
			m5.getSelezione().add(b5);
			serviceMenu.modifica(m5);
			m6.getSelezione().add(p16);
			m6.getSelezione().add(p17);
			m6.getSelezione().add(p18);
			m6.getSelezione().add(b6);
			serviceMenu.modifica(m6);
			m7.getSelezione().add(p19);
			m7.getSelezione().add(p20);
			m7.getSelezione().add(p21);
			m7.getSelezione().add(p22);
			m7.getSelezione().add(b7);
			m7.getSelezione().add(b8);
			serviceMenu.modifica(m7);

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