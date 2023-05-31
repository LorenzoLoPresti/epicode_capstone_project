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

			// CREAZIONE RISTORANTE
			serviceRistorante.salva(ristorante.getObject("La Pergola", "Roma", "06 3509 2152",
					"/src/assets/ristoranti/la_pergola_roma.jpg"));
			serviceRistorante.salva(
					ristorante.getObject("Aroma", "Roma", "06 9761 5109", "/src/assets/ristoranti/aroma_roma.jpg"));
			serviceRistorante.salva(ristorante.getObject("Mirabelle", "Roma", "06 4216 8838",
					"/src/assets/ristoranti/mirabelle_roma.jpg"));
			serviceRistorante.salva(
					ristorante.getObject("Anima", "Milano", "02 6227 8500", "/src/assets/ristoranti/anima_milano.jpg"));
			serviceRistorante.salva(
					ristorante.getObject("Seta", "Milano", "02 8731 8897", "/src/assets/ristoranti/seta_milano.jpg"));
			serviceRistorante.salva(ristorante.getObject("Iyo Aalto", "Milano", "02 4547 6898",
					"/src/assets/ristoranti/iyoaalto_milano.jpg"));

			// SET RISTORANTE 1
			Ristorante r1 = serviceRistorante.cercaPerId(1l);
			r1.setDescrizione("Un panorama unico della Città Eterna si apre"
					+ " alla vista degli ospiti di uno dei ristoranti più belli del mondo.");
			r1.setDescrizione2("Una cucina innovativa che celebra la tradizione con creatività, "
					+ "piatti unici e ingredienti freschi. Cantina ricca di vini pregiati per abbinamenti unici. "
					+ "Un'esperienza culinaria di gusto ed eleganza,");
			r1.setMenu_img("/src/assets/menu/la_pergola.jpg");
			r1.setIndirizzo("Via Alberto Cadlolo 101");
			serviceRistorante.modifica(r1);
			
			// SET RISTORANTE 2
			Ristorante r2 = serviceRistorante.cercaPerId(2l);
			r2.setDescrizione("Le ricette gourmet rielaborano i sapori e i gusti della tradizione italiana,"
					+ " mentre la cantina selezionata dal Sommelier ha un’impronta molto internazionale "
					+ "con un focus particolare sugli champagne e una selezione di vini di oltre 600 etichette.");
			r2.setDescrizione2("Piatti unici, ingredienti freschi e presentazione curata. "
					+ "Cantina con selezione di vini pregiati per abbinamenti unici. "
					+ "Esperienza culinaria di gusto ed eleganza in ogni boccone.");
			r2.setMenu_img("/src/assets/menu/aroma.jpg");
			r2.setIndirizzo("Via Labicana 125");
			serviceRistorante.modifica(r2);
			
			// SET RISTORANTE 3
			Ristorante r3 = serviceRistorante.cercaPerId(3l);
			r3.setDescrizione(
					"Una terrazza gourmet con una vista che partendo da Villa Medici e Trinità dei Monti arriva fino"
							+ " a San Pietro e al Gianicolo. A fare da cornice a questo meraviglioso scorcio ci sono un'insuperabile accoglienza"
							+ " e una cucina raffinata.");
			r3.setDescrizione2("Un'offerta gastronomica eccezionale accoglie gli ospiti in un ambiente raffinato."
					+ " Una cucina innovativa e una selezione di vini pregiati completano il tutto."
					+ " Un'esperienza culinaria di gusto ed eleganza, dove ogni boccone è un'opera d'arte.");
			r3.setMenu_img("/src/assets/menu/mirabelle.jpg");
			r3.setIndirizzo("Via di Porta Pinciana 14");
			serviceRistorante.modifica(r3);
			
			// SET RISTORANTE 4
			Ristorante r4 = serviceRistorante.cercaPerId(4l);
			r4.setDescrizione(
					"Una cucina diretta dal resident chef Michele, che con mano precisa crea piatti dai sapori moderni,"
							+ " esaltati grazie all'ottima materia prima proveniente - principalmente - dalla sua terra di origine: la Puglia.");
			r4.setDescrizione2("Un'esperienza culinaria che celebra l'eccellenza degli ingredienti,"
					+ " con una mano precisa che crea piatti unici e indimenticabili."
					+ " Un tributo alla tradizione culinaria pugliese, rivisitata con creatività e maestria.");
			r4.setMenu_img("/src/assets/menu/la_pergola.jpg");
			r4.setIndirizzo("via Gaspare Rosales 4");
			serviceRistorante.modifica(r4);
			
			// SET RISTORANTE 5
			Ristorante r5 = serviceRistorante.cercaPerId(5l);
			r5.setDescrizione(
					"Il menu, curato attentamente dallo Chef Antonio Guida, presenta un approccio creativo e contemporaneo alla cucina italiana,"
							+ " unendo ingredienti tradizionali e tecniche innovative in un perfetto equilibrio.");
			r5.setDescrizione2("Gli ingredienti si fondono armoniosamente con tecniche innovative,"
					+ " creando un perfetto equilibrio di sapori e presentazioni."
					+ " Un'esperienza gastronomica che celebra l'arte culinaria italiana in una veste moderna e affascinante.");
			r5.setMenu_img("/src/assets/menu/aroma.jpg");
			r5.setIndirizzo("Via Andegari 9");
			serviceRistorante.modifica(r5);
			
			// SET RISTORANTE 6
			Ristorante r6 = serviceRistorante.cercaPerId(6l);
			r6.setDescrizione(
					"Aperto nel 2007 da Claudio Liu, IYO è un ristorante di sushi innovativo e alta cucina giapponese contemporanea, premiato con una Stella nella Guida MICHELIN 2023."
							+ " La firma di una cucina totale, che abbraccia ogni dettaglio dell’esperienza gastronomica.");
			r6.setDescrizione2("Un luogo dove la tradizione culinaria giapponese si fonde con l'innovazione,"
					+ " offrendo piatti eccezionali che soddisfano i palati più esigenti."
					+ " Una destinazione imperdibile per gli amanti del sushi e della cucina giapponese di alta qualità.");
			r6.setMenu_img("/src/assets/menu/sushi.jpg");
			r6.setIndirizzo("Via Piero della Francesca 74");
			serviceRistorante.modifica(r6);

			// SELEZIONO RISTORANTI PER ID
			r1 = serviceRistorante.cercaPerId(1l);
			r2 = serviceRistorante.cercaPerId(2l);
			r3 = serviceRistorante.cercaPerId(3l);
			r4 = serviceRistorante.cercaPerId(4l);
			r5 = serviceRistorante.cercaPerId(5l);
			r6 = serviceRistorante.cercaPerId(6l);

			// CREAZIONE CHEF
			serviceChef.salva(chef.getObject("Gustavo Fring", CategoriaChef.CARNE, serviceRistorante.cercaPerId(1l), 45));
			serviceChef.salva(
					chef.getObject("Walter White", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(2l), 50));
			serviceChef
					.salva(chef.getObject("Jesse Pinkman", CategoriaChef.PESCE, serviceRistorante.cercaPerId(2l), 20));
			serviceChef.salva(
					chef.getObject("Gale Boetticher", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(1l), 40));
			serviceChef
					.salva(chef.getObject("Bruno Barbieri", CategoriaChef.CARNE, serviceRistorante.cercaPerId(3l), 35));
			serviceChef.salva(
					chef.getObject("Giorgio Locatelli", CategoriaChef.PESCE, serviceRistorante.cercaPerId(3l), 25));
			serviceChef.salva(
					chef.getObject("Enrico Bartolini", CategoriaChef.GENERALE, serviceRistorante.cercaPerId(4l), 60));
			serviceChef
					.salva(chef.getObject("Antonio Guida", CategoriaChef.CARNE, serviceRistorante.cercaPerId(5l), 45));
			serviceChef.salva(chef.getObject("Claudio Liu", CategoriaChef.PESCE, serviceRistorante.cercaPerId(6l), 50));

			// SET DESCRIZIONE CHEF
			Chef c1 = serviceChef.cercaPerId(1l);
			c1.setDescrizioneChef("Maestro culinario dal fascino enigmatico, incanta gli ospiti con la sua offerta gourmet."
					+ " Un'esperienza gastronomica avvolta nel mistero, dove ogni boccone è una scoperta gustativa.");
			serviceChef.modifica(c1);
			
			Chef c2 = serviceChef.cercaPerId(2l);
			c2.setDescrizioneChef("\"I'm the one who cooks\"."
					+ " Walter White trasforma la cucina in un vero e proprio laboratorio esplosivo di sapori."
					+ " La sua passione per la chimica si fonde con l'arte culinaria, creando piatti che sono autentiche reazioni gustative.");
			serviceChef.modifica(c2);
			
			Chef c3 = serviceChef.cercaPerId(3l);
			c3.setDescrizioneChef("\"Yo, la cucina è arte, amico!\" Con la sua anima ribelle, Jesse mescola gli ingredienti come fossero note musicali, creando sinfonie di sapori sorprendenti"
					+ " con quel tocco di piccantezza che rende ogni piatto indimenticabile.");
			serviceChef.modifica(c3);
			
			Chef c4 = serviceChef.cercaPerId(4l);
			c4.setDescrizioneChef("Con la sua passione per la precisione e la presentazione impeccabile,"
					+ " Gale crea piatti che sono vere e proprie opere d'arte gastronomiche e porta "
					+ "i commensali in un viaggio gustativo senza precedenti.");
			serviceChef.modifica(c4);
			
			Chef c5 = serviceChef.cercaPerId(5l);
			c5.setDescrizioneChef("Il virtuoso della cucina sorprende con la sua maestria culinaria. Con passione e precisione, crea piatti che sono vere e proprie sinfonie di sapori."
					+ " Lasciatevi deliziare dalla genialità culinaria di Bruno Barbieri, un vero maestro dei sensi. ");
			serviceChef.modifica(c5);
			
			Chef c6 = serviceChef.cercaPerId(6l);
			c6.setDescrizioneChef("Giorgio Locatelli, l'artista culinario appassionato, incanta i palati con la sua abilità senza pari."
					+ " Con una maestria che nasce dalla tradizione italiana,"
					+ " Giorgio crea piatti che sono vere e proprie opere d'arte gastronomiche.");
			serviceChef.modifica(c6);
			
			Chef c7 = serviceChef.cercaPerId(7l);
			c7.setDescrizioneChef(" Con la sua creatività senza confini,"
					+ " Enrico mescola ingredienti di alta qualità e tecniche innovative per creare piatti che sono veri capolavori culinari.");
			serviceChef.modifica(c7);
			
			Chef c8 = serviceChef.cercaPerId(8l);
			c8.setDescrizioneChef("il maestro culinario dallo spirito creativo e una visione unica della gastronomia."
					+ " Con un equilibrio magistrale tra tradizione e innovazione, Antonio crea piatti che sono vere opere d'arte culinarie.");
			serviceChef.modifica(c8);
			
			Chef c9 = serviceChef.cercaPerId(9l);
			c9.setDescrizioneChef("maestro dell'arte culinaria giapponese, stupisce i commensali con la sua creatività senza limiti."
					+ " Ogni boccone è un viaggio sensoriale, in cui gli ingredienti si fondono con tecniche affinate nel tempo. ");
			serviceChef.modifica(c9);
			
			// SELEZIONO CHEF PER ID
			c1 = serviceChef.cercaPerId(1l);
			c2 = serviceChef.cercaPerId(2l);
			c3 = serviceChef.cercaPerId(3l);
			c4 = serviceChef.cercaPerId(4l);
			c5 = serviceChef.cercaPerId(5l);
			c6 = serviceChef.cercaPerId(6l);
			c7 = serviceChef.cercaPerId(7l);
			c8 = serviceChef.cercaPerId(8l);
			c9 = serviceChef.cercaPerId(9l);

			// CREAZIONE MENU
			serviceMenu.salva(menu.getObject(c1));
			serviceMenu.salva(menu.getObject(c2));
			serviceMenu.salva(menu.getObject(c3));
			serviceMenu.salva(menu.getObject(c4));
			serviceMenu.salva(menu.getObject(c5));
			serviceMenu.salva(menu.getObject(c6));
			serviceMenu.salva(menu.getObject(c1));
			serviceMenu.salva(menu.getObject(c7));
			serviceMenu.salva(menu.getObject(c8));
			serviceMenu.salva(menu.getObject(c9));

			Menu m1 = serviceMenu.cercaPerId(1l);
			Menu m2 = serviceMenu.cercaPerId(2l);
			Menu m3 = serviceMenu.cercaPerId(3l);
			Menu m4 = serviceMenu.cercaPerId(4l);
			Menu m5 = serviceMenu.cercaPerId(5l);
			Menu m6 = serviceMenu.cercaPerId(6l);
			Menu m7 = serviceMenu.cercaPerId(7l);
			Menu m8 = serviceMenu.cercaPerId(8l);
			Menu m9 = serviceMenu.cercaPerId(9l);
			Menu m10 = serviceMenu.cercaPerId(10l);

// 			AGGIUNGO MENU A CHEF
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
			c7.getListaMenu().add(m8);
			c7.setImmagineProfilo("/src/assets/chef/bartolini_posa.jpg");
			c7.setImmagineCucina("/src/assets/chef/bartolini_cucina.jpg");
			serviceChef.modifica(c7);
			c8.getListaMenu().add(m9);
			c8.setImmagineProfilo("/src/assets/chef/guida_posa.jpg");
			c8.setImmagineCucina("/src/assets/chef/guida_cucina.jpg");
			serviceChef.modifica(c8);
			c9.getListaMenu().add(m10);
			c9.setImmagineProfilo("/src/assets/chef/liu_posa.jpg");
			c9.setImmagineCucina("/src/assets/chef/liu_cucina.jpg");
			serviceChef.modifica(c9);

			c1 = serviceChef.cercaPerId(1l);
			c2 = serviceChef.cercaPerId(2l);
			c3 = serviceChef.cercaPerId(3l);
			c4 = serviceChef.cercaPerId(4l);
			c5 = serviceChef.cercaPerId(5l);
			c6 = serviceChef.cercaPerId(6l);
			c7 = serviceChef.cercaPerId(7l);
			c8 = serviceChef.cercaPerId(8l);
			c9 = serviceChef.cercaPerId(9l);

			// AGGIUNGO CHEF A RISTORANTE
			r1.getListaChef().add(c1);
			r1.getListaChef().add(c4);
			serviceRistorante.modifica(r1);
			r2.getListaChef().add(c2);
			r2.getListaChef().add(c3);
			serviceRistorante.modifica(r2);
			r3.getListaChef().add(c5);
			r3.getListaChef().add(c6);
			serviceRistorante.modifica(r3);
			r4.getListaChef().add(c7);
			serviceRistorante.modifica(r4);
			r5.getListaChef().add(c8);
			serviceRistorante.modifica(r5);
			r6.getListaChef().add(c9);
			serviceRistorante.modifica(r6);

			// CREAZIONE PIATTI ROMA
			servicePiatto.salva(piatto.getObject("Gnocchi al ragù di pollo", CategoriaProdotto.PRIMO, 14.00, "Una deliziosa combinazione di gnocchi di patate morbidi e saporito ragù di pollo.", m1,
					TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Filetto di manzo alla griglia con salsa al vino rosso",
					CategoriaProdotto.SECONDO, 17.00, "Un capolavoro di carne succulenta e tenera, accarezzato da una salsa al vino rosso avvolgente.", m1, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Panna cotta con coulis di frutti di bosco", CategoriaProdotto.DOLCE,
					17.00, "Un dolce paradisiaco che unisce la delicatezza della panna cotta con la freschezza dei frutti di bosco.", m1, TipoCottura.COTTO, 25));

			servicePiatto.salva(
					piatto.getObject("Meth-a Carbonara", CategoriaProdotto.PRIMO, 18.00, "La pasta al dente è avvolta in una salsa cremosa al formaggio blu, arricchita da una nota segreta.", m2, TipoCottura.COTTO, 25));
			servicePiatto.salva(
					piatto.getObject("Heisenberg's Special", CategoriaProdotto.SECONDO, 29.00, "un'opera d'arte gastronomica che unisce un filetto di manzo di prima qualità con una riduzione di salsa di mirtilli e una guarnizione di chips di patate blu.", m2, TipoCottura.COTTO, 40));
			servicePiatto
					.salva(piatto.getObject("Blue Crystal Cheesecake", CategoriaProdotto.DOLCE, 14.00, "Questo dolce al formaggio cremoso è arricchito da una salsa al caramello e decorato con cristalli di zucchero blu scintillanti.", m2, TipoCottura.COTTO, 15));

			servicePiatto.salva(
					piatto.getObject("Yo, B*tch Lasagna", CategoriaProdotto.PRIMO, 17.00, "Questa lasagna artigianale è composta da strati di pasta all'uovo, ricotta cremosa, ragù di pesce e gamberi saporiti.", m3, TipoCottura.COTTO, 35));
			servicePiatto.salva(
					piatto.getObject("Blu Ocean Delight", CategoriaProdotto.SECONDO, 23.00, "Un filetto di salmone fresco, marinato con una salsa segreta a base di agrumi e peperoncino, che dona un tocco piccante e vibrante.", m3, TipoCottura.COTTO, 25));
			servicePiatto
					.salva(piatto.getObject("Blueberry Bliss Explosion", CategoriaProdotto.DOLCE, 14.00, "Una morbida base di cheesecake al limone, arricchita con un generoso strato di mirtilli freschi e una spolverata di zucchero a velo blu scintillante.", m3, TipoCottura.COTTO, 10));

			servicePiatto.salva(
					piatto.getObject("Gustoso Raviolo d'Autore", CategoriaProdotto.PRIMO, 20.00, "Questo raviolo artigianale è farcito con una delicata mousse di burrata e basilico, avvolto in una sfoglia sottile e al dente.", m4, TipoCottura.COTTO, 25));
			servicePiatto.salva(
					piatto.getObject("Roasted Chilean Sea Bass", CategoriaProdotto.SECONDO, 25.00, "Filetto di branzino cileno, pescato fresco, viene cotto al forno con una crosta croccante di mandorle e prezzemolo, che conferisce una nota di fragranza e gusto alle morbide carni del pesce.", m4, TipoCottura.COTTO, 25));
			servicePiatto
					.salva(piatto.getObject("Delizia di Cacao e Caramello", CategoriaProdotto.DOLCE, 15.00, "Un cuore morbido e fondente al cacao, circondato da uno strato di caramello artigianale dalla consistenza setosa. ", m4, TipoCottura.COTTO, 10));

			servicePiatto.salva(
					piatto.getObject("Risotto al Tartufo Nero", CategoriaProdotto.PRIMO, 27.00, "Risotto cremoso preparato con un pregiato riso Carnaroli, lentamente cotto in un brodo vegetale aromatizzato, arricchito con il tocco inconfondibile del tartufo nero.", m5, TipoCottura.COTTO, 40));
			servicePiatto.salva(
					piatto.getObject("Tagliata di Manzo al Rosmarino", CategoriaProdotto.SECONDO, 30.00, "Questa specialità è composta da un tenero taglio di manzo di alta qualità, marinato con un mix di spezie e aromi, e poi grigliato alla perfezione", m5, TipoCottura.COTTO, 25));
			servicePiatto
					.salva(piatto.getObject("Soufflé al Cioccolato e Arancia", CategoriaProdotto.DOLCE, 17.00, "Questo soufflé leggero e soffice è preparato con una base di cioccolato fondente di alta qualità e una nota vibrante di arancia fresca.", m5, TipoCottura.COTTO, 25));

			servicePiatto.salva(
					piatto.getObject("Spaghetti alle Vongole e Bottarga", CategoriaProdotto.PRIMO, 32.00, "Spaghetti al dente, conditi con un'irresistibile salsa di vongole fresche, aglio, peperoncino e prezzemolo. ", m6, TipoCottura.COTTO, 25));
			servicePiatto.salva(
					piatto.getObject("Branzino al Limone e Finocchio", CategoriaProdotto.SECONDO, 37.00, "Il branzino fresco viene delicatamente marinato con succo di limone fresco, prezzemolo e una nota di aglio, poi grigliato alla perfezione per ottenere una pelle croccante e una carne morbida e succosa.", m6, TipoCottura.COTTO, 35));
			servicePiatto
					.salva(piatto.getObject("Torta al Pistacchio e Arancia", CategoriaProdotto.PRIMO, 17.00, "Questa torta leggera e soffice è realizzata con una base di pasta frolla croccante e un irresistibile ripieno al pistacchio, che conferisce un sapore intenso e avvolgente.", m6, TipoCottura.COTTO, 20));

			servicePiatto.salva(piatto.getObject("Insalata di pollo alla Caesar", CategoriaProdotto.ANTIPASTO, 10.00,
					"Petto di pollo grigliato su un mix di lattuga croccante, parmigiano grattugiato e crostini di pane. Il tutto condito con una salsa cremosa e avvolgente a base di maionese, acciughe, succo di limone, senape e pepe nero.", m7, TipoCottura.COTTO, 10));
			servicePiatto.salva(piatto.getObject("Tagliatelle al tartufo nero", CategoriaProdotto.PRIMO, 29.00, "Tagliatelle condite con una delicata salsa al tartufo nero, arricchita con burro e parmigiano per una cremosità irresistibile. ", m7,
					TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Costolette di agnello in crosta di erbette",
					CategoriaProdotto.SECONDO, 29.00, "Costolette avvolte in una crosta croccante e profumata di erbette fresche, come prezzemolo, timo e rosmarino.", m7, TipoCottura.COTTO, 35));
			servicePiatto.salva(piatto.getObject("Torta al cioccolato fondente con gelato alla vaniglia",
					CategoriaProdotto.DOLCE, 9.00, "Una base di torta al cioccolato fondente, morbida e ricca, si abbina perfettamente al gusto cremoso e aromatico del gelato alla vaniglia.", m7, TipoCottura.COTTO, 10));

			// CREAZIONE BEVANDE ROMA
			serviceBevanda.salva(bevanda.getObject("Marchese di Villamarina", CategoriaProdotto.BEVANDA, 38.00,
					"Il vino Marchese di Villamarina è un'eccellenza italiana. Di colore intenso, presenta un bouquet complesso e avvolgente di frutti maturi, spezie e note floreali. In bocca è elegante, con tannini morbidi e una piacevole persistenza",
					m1, TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Molvina", CategoriaProdotto.BEVANDA, 45.00,
					"Il vino Molvina è un'opera d'arte enologica. Colore vivace, aroma fruttato e fresco con accenti floreali. Gusto equilibrato e persistente con una piacevole acidità",
					m2, TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Leonardo Da Vinci", CategoriaProdotto.BEVANDA, 35.00,
					"Il vino Leonardo Da Vinci è un'opera di maestria enologica. Profondo colore rubino, con intensi aromi di frutti rossi e spezie. In bocca è pieno, armonico e di lunga persistenza.",
					m3, TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Batasiolo", CategoriaProdotto.BEVANDA, 35.00,
					"Il vino Batasiolo è un'autentica espressione del Piemonte. Colore brillante, con profumi intensi di frutti maturi, spezie e sottobosco. In bocca è strutturato, elegante e persistente, con un equilibrio perfetto tra acidità e tannini.",
					m4, TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Brunello di Montalcino", CategoriaProdotto.BEVANDA, 41.00,
					"Il Brunello di Montalcino è uno dei vini più rinomati e ammirati in Italia. Prodotto nella regione toscana, presenta un colore rubino intenso e un profilo aromatico complesso con note di frutta rossa, spezie, tabacco e cuoio.",
					m5, TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Tignanello", CategoriaProdotto.BEVANDA, 174.00,
					"Il Tignanello è un rinomato vino toscano. Di colore intenso, offre un bouquet complesso di frutti rossi, spezie, tabacco e note balsamiche. In bocca è elegante, con tannini vellutati e un'armoniosa acidità.",
					m6, TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Molvina", CategoriaProdotto.BEVANDA, 45.00,
					"Il vino Molvina è un'opera d'arte enologica. Colore vivace, aroma fruttato e fresco con accenti floreali. Gusto equilibrato e persistente con una piacevole acidità",
					m7, TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Brunello di Montalcino", CategoriaProdotto.BEVANDA, 45.00,
					"Il Brunello di Montalcino è uno dei vini più rinomati e ammirati in Italia. Prodotto nella regione toscana, presenta un colore rubino intenso e un profilo aromatico complesso con note di frutta rossa, spezie, tabacco e cuoio.",
					m7, TipoBevanda.ALCOLICA));

			// PIATTI MILANO
			servicePiatto.salva(piatto.getObject("Ravioli di zucca con salsa al burro e salvia", CategoriaProdotto.PRIMO, 19.00, " I ravioli artigianali, ripieni di una morbida crema di zucca, vengono accompagnati da una delicata salsa al burro e salvia.", m8,
					TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Tagliata di manzo con riduzione di aceto balsamico e patate arrosto",
					CategoriaProdotto.SECONDO, 30.00, " La tagliata, cotta alla perfezione, è servita con una deliziosa riduzione di aceto balsamico, che le conferisce una nota agrodolce.", m8, TipoCottura.COTTO, 35));
			servicePiatto.salva(piatto.getObject("Torta al cioccolato con cuore fondente e salsa di frutti di bosco", CategoriaProdotto.DOLCE,
					10.00, "Una torta al cioccolato decadente e soffice, con un cuore fondente che si scioglie al primo morso.", m8, TipoCottura.COTTO, 25));

			servicePiatto.salva(piatto.getObject("Gnocchi di patate con ragù di salsiccia e funghi porcini", CategoriaProdotto.PRIMO, 19.00, "Un piatto che unisce la delicatezza degli gnocchi di patate fatti in casa con la robustezza del ragù di salsiccia e funghi porcini.", m9,
					TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Tagliata di manzo con crema di patate e salsa al vino rosso",
					CategoriaProdotto.SECONDO, 33.00, "La carne, tagliata a fette sottili, è morbida e succosa, mentre la crema di patate regala una consistenza cremosa e un sapore delicato.", m9, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Tortino al cioccolato con cuore morbido di pistacchio e gelato alla vaniglia", CategoriaProdotto.DOLCE,
					11.00, "Il tortino, appena sfornato, si presenta con una crosticina croccante e un cuore fondente che si scioglie al primo assaggio.", m9, TipoCottura.COTTO, 10));

			servicePiatto.salva(piatto.getObject("Tartare di tonno bluefin con guacamole al wasabi e chips di alga nori", CategoriaProdotto.SECONDO, 32.00, "Una tartare di tonno bluefin, il gioiello del mare, finemente tritato e condito con una delicata guacamole al wasabi. ", m10,
					TipoCottura.CRUDO, 25));
			servicePiatto.salva(piatto.getObject("Salmone glassato all'arancia su letto di riso nero venere e julienne di verdure",
					CategoriaProdotto.SECONDO, 36.00, "Servito su un letto di riso nero venere, arricchito da una julienne di verdure croccanti.", m10, TipoCottura.COTTO, 25));
			servicePiatto.salva(piatto.getObject("Mousse di matcha con gelato al tè verde e spuma di yuzu", CategoriaProdotto.DOLCE,
					17.00, "Una mousse leggera e setosa al tè verde matcha, accompagnata da un gelato al tè verde e una spuma di yuzu, un agrume giapponese dal sapore unico.", m10, TipoCottura.COTTO, 15));

//			BEVANDE MILANO
			serviceBevanda.salva(bevanda.getObject("Marchese di Villamarina", CategoriaProdotto.BEVANDA, 38.00,
					"Il vino Marchese di Villamarina è un'eccellenza italiana. Di colore intenso, presenta un bouquet complesso e avvolgente di frutti maturi, spezie e note floreali. In bocca è elegante, con tannini morbidi e una piacevole persistenza",
					m8, TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Marchese di Villamarina", CategoriaProdotto.BEVANDA, 38.00,
					"Il vino Marchese di Villamarina è un'eccellenza italiana. Di colore intenso, presenta un bouquet complesso e avvolgente di frutti maturi, spezie e note floreali. In bocca è elegante, con tannini morbidi e una piacevole persistenza",
					m9, TipoBevanda.ALCOLICA));
			serviceBevanda.salva(bevanda.getObject("Marchese di Villamarina", CategoriaProdotto.BEVANDA, 38.00,
					"Il vino Marchese di Villamarina è un'eccellenza italiana. Di colore intenso, presenta un bouquet complesso e avvolgente di frutti maturi, spezie e note floreali. In bocca è elegante, con tannini morbidi e una piacevole persistenza",
					m10, TipoBevanda.ALCOLICA));

//			serviceBevanda.salva(bevanda.getObject("Molvina", CategoriaProdotto.BEVANDA, 45.00, m6, TipoBevanda.ALCOLICA, ""));

			// SELEZIONO PIATTI ROMA
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

			// SELEZIONO BEVANDE ROMA
			Bevanda b1 = serviceBevanda.cercaPerId(23l);
			Bevanda b2 = serviceBevanda.cercaPerId(24l);
			Bevanda b3 = serviceBevanda.cercaPerId(25l);
			Bevanda b4 = serviceBevanda.cercaPerId(26l);
			Bevanda b5 = serviceBevanda.cercaPerId(27l);
			Bevanda b6 = serviceBevanda.cercaPerId(28l);
			Bevanda b7 = serviceBevanda.cercaPerId(29l);
			Bevanda b8 = serviceBevanda.cercaPerId(30l);

			// SELEZIONO PIATTI MILANO
			Piatto p31 = servicePiatto.cercaPerId(31l);
			Piatto p32 = servicePiatto.cercaPerId(32l);
			Piatto p33 = servicePiatto.cercaPerId(33l);
			Piatto p34 = servicePiatto.cercaPerId(34l);
			Piatto p35 = servicePiatto.cercaPerId(35l);
			Piatto p36 = servicePiatto.cercaPerId(36l);
			Piatto p37 = servicePiatto.cercaPerId(37l);
			Piatto p38 = servicePiatto.cercaPerId(38l);
			Piatto p39 = servicePiatto.cercaPerId(39l);

			
			// SELEZIONO BEVANDE MILANO
			Bevanda b9 = serviceBevanda.cercaPerId(40l);
			Bevanda b10 = serviceBevanda.cercaPerId(41l);
			Bevanda b11 = serviceBevanda.cercaPerId(42l);

			// AGGIUNGO MENU A SELEZIONE ROMA
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

			// AGGIUNGO MENU A SELEZIONE MILANO

			m8.getSelezione().add(p31);
			m8.getSelezione().add(p32);
			m8.getSelezione().add(p33);
			m8.getSelezione().add(b9);
			serviceMenu.modifica(m8);
			m9.getSelezione().add(p34);
			m9.getSelezione().add(p35);
			m9.getSelezione().add(p36);
			m9.getSelezione().add(b10);
			serviceMenu.modifica(m9);
			m10.getSelezione().add(p37);
			m10.getSelezione().add(p38);
			m10.getSelezione().add(p39);
			m10.getSelezione().add(b11);
			serviceMenu.modifica(m10);

		}
	}
}
