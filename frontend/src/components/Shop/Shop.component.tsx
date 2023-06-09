import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import styles from "./Shop.module.css";
import { Col, Row } from "react-bootstrap";
import AccordionMenu from "../AccordionMenu/AccordionMenu.component";
import { BiPlus } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import { ListaProdotti } from "../../pages/Home/Home.types";
import Vino from "../VinoElemento/Vino.component";
import GeneralButton from "../Button/GeneralButton/GeneralButton.component";
import {
  addDataCena,
  addListaVini,
  addMenu,
  addNumberOfPeaple,
  addUsernameToCart,
} from "../../redux/reducers/carrelloStore";
import COLORS from "../../style/color";

interface Carrello {
  username: string;
  partecipanti: number;
  menu: ListaProdotti[];
  vini: ListaProdotti[];
  dataCena: string;
}

const Shop = () => {
  const ristorante = useAppSelector((state) => state.authToken?.ristoranti);
  const username = useAppSelector((state) => state.authToken?.username);
  const reduxCart = useAppSelector((state) => state.carrelloReducer);
  const { nomeRistorante } = useParams();
  const chefSelezionato = useAppSelector(
    (state) => state.carrelloReducer?.chef
  );
  const [numeroCommensali, setNumeroCommensali] = useState(0);
  const [menuSelected, setMenuSelected] = useState<ListaProdotti[]>([]);
  const [cartaVini, setCartaVini] = useState<ListaProdotti[]>([]);
  const [listaViniScelti, setListaViniScelti] = useState<ListaProdotti[]>([]);
  const [dateSelected, setDateSelected] = useState("");
  const [nomeVinoSelezionato, setNomeVinoSelezionato] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dataDiOggi = new Date().toISOString().split("T")[0];

  const carrello: Carrello = {
    username: username,
    partecipanti: numeroCommensali,
    menu: menuSelected,
    vini: listaViniScelti,
    dataCena: dateSelected,
  };

  // SALVA CARRELLO IN REDUX E PORTA ALLA PAGINA DI CHECKOUT
  const handleDispatch = ({
    username,
    partecipanti,
    menu,
    vini,
    dataCena,
  }: Carrello) => {
    dispatch(addUsernameToCart(username));
    dispatch(addNumberOfPeaple(partecipanti));
    dispatch(addMenu(menu));
    dispatch(addListaVini(vini));
    dispatch(addDataCena(dataCena));

    console.log(menuSelected);
    console.log(dateSelected);
    console.log(listaViniScelti);
    console.log(nomeVinoSelezionato);

    navigate("/checkout");
  };

  // FUNZIONI PER CAMBIARE NUMERO DI PARTECIPANTI ALLA CENA
  const aggiungiCommensale = () => {
    if (numeroCommensali < 8) setNumeroCommensali(numeroCommensali + 1);
  };
  const rimuoviCommensale = () => {
    if (numeroCommensali > 0) setNumeroCommensali(numeroCommensali - 1);
  };

  const handleDatePicker = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // SELEZIONA VINO
  const handleWineSelector = (nomeVino: string) => {
    if (nomeVinoSelezionato) {
      setNomeVinoSelezionato("");
    } else {
      setNomeVinoSelezionato(nomeVino);
    }
  };

  // REQUISITI PER RAGGIUNGERE LA PAGINA DI CHECKOUT
  const verifica = () => {
    if (
      menuSelected.length === 0 ||
      numeroCommensali === 0 ||
      dateSelected === ""
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!chefSelezionato && nomeRistorante) {
      navigate(`/store/${nomeRistorante}`);
    } else if (!chefSelezionato) {
      navigate("/");
    }

    reduxCart?.numeroCommensali !== 0
      ? setNumeroCommensali(reduxCart?.numeroCommensali)
      : setNumeroCommensali(numeroCommensali);

    reduxCart?.dataCena !== null
      ? setDateSelected(reduxCart?.dataCena)
      : setDateSelected("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${ristorante
            .filter((e) => e.name === nomeRistorante)
            .map((e) => e.immagine)})`,
          height: "100vh",
          width: "100vw",
          backgroundSize: "cover",
        }}
      >
        <div className={`${styles.mainContainer}`}>
          {/* INTRO */}
          <div className={styles.popup}>
            <Row className=" pt-5 mb-0 flex-column">
              <Col className={`${styles.chefNameContainer} mb-4`}>
                <h1 className={`text-light ${styles.chefName}`}>
                  Il menu di {chefSelezionato?.name}
                </h1>
                <p
                  style={{ cursor: "pointer", color: COLORS.brandGold }}
                  className={`pe-3 ${styles.goBackLink}`}
                  onClick={() => navigate(`/store/${nomeRistorante}`)}
                >
                  torna indietro
                </p>
              </Col>
              <Col className="my-4">
                <h4 className=" mb-4 fs-3" style={{ color: "#ccb7a9" }}>
                  Seleziona il menu per la tua serata
                </h4>
                <div className="d-flex flex-column">
                  <p className={`text-light ${styles.copyOptions}`}>
                    Per soddisfare i gusti più raffinati e gli appetiti più
                    esigenti i nostri chef esperti creano piatti prelibati
                    utilizzando ingredienti freschi e di alta qualità,
                    combinando sapori innovativi e tradizionali.
                  </p>
                  <p className={`text-light mb-0 ${styles.copyOptions}`}>
                    Dai un'occhiata ai dettagli dei menu gourmet disponibili e
                    lasciati tentare dalle creazioni culinarie che renderanno la
                    tua serata davvero memorabile.
                  </p>
                  <p className={`text-light ${styles.copyOptions}`}>
                    Prepara il palato e preparati a gustare un viaggio
                    gastronomico di alto livello.
                  </p>
                  <p className={`mb-3 text-light ${styles.copyOptions}`}>
                    Scegli il tuo menu e prenota ora per una serata
                    indimenticabile.
                  </p>
                </div>
              </Col>
            </Row>
            {/* SELEZIONE MENU */}
            <Row className="mb-5">
              <Col xs={12} lg={4} className="pt-2">
                <div
                  className={`${styles.chefImage}`}
                  style={{
                    backgroundImage: `url(${chefSelezionato?.immagineCucina})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </Col>
              <Col lg={8}>
                <Col
                  className="mb-4 mt-4 mt-lg-0 d-flex align-items-center justify-content-between"
                  style={{ borderBottom: "1px solid #474c55" }}
                >
                  <h4 className="mb-0 fs-5" style={{ color: "#ccb7a9" }}>
                    Inserisci il numero di partecipanti
                  </h4>
                  <div className="text-light text-center d-flex align-items-center">
                    {/* INSERISCI IL NUMERO DI PARTECIPANTI */}
                    <button
                      className={`px-1 ms-1 ${
                        numeroCommensali > 0 && styles.commensaliBtn
                      } ${numeroCommensali <= 0 && styles.btnDisabled}`}
                      onClick={rimuoviCommensale}
                    >
                      <AiOutlineMinus className={`${styles.btnContent}`} />
                    </button>
                    <span className="px-1 fs-3" style={{ width: "1.6rem" }}>
                      {numeroCommensali}
                    </span>
                    <button
                      className={`px-1 me-1 ${
                        numeroCommensali < 8 && styles.commensaliBtn
                      } ${numeroCommensali >= 8 && styles.btnDisabled}`}
                      onClick={aggiungiCommensale}
                    >
                      <BiPlus className={`${styles.btnContent}`} />
                    </button>
                  </div>
                </Col>
                {/* SELEZIONA DATA */}
                <Col
                  className="mb-4 mt-4 mt-lg-0 pb-2 d-flex align-items-center justify-content-between"
                  style={{ borderBottom: "1px solid #474c55" }}
                >
                  <h4 className="mb-0 fs-5" style={{ color: "#ccb7a9" }}>
                    Seleziona la data
                  </h4>
                  <form onSubmit={handleDatePicker}>
                    <div className={styles.inputBox}>
                      <input
                        className={styles.inputOptions}
                        type="date"
                        value={dateSelected}
                        onChange={(e) => setDateSelected(e.target.value)}
                        min={dataDiOggi}
                        required
                      />
                    </div>
                  </form>
                </Col>
                {/* SELEZIONA OPZIONE MENU */}
                <Col>
                  <h4 className="mb-3 fs-5" style={{ color: "#ccb7a9" }}>
                    Seleziona menu
                  </h4>
                  {chefSelezionato?.listaMenu.map((s, i) => (
                    <AccordionMenu
                      key={i}
                      opzione={i + 1}
                      selezione={s?.selezione}
                      setMenuSelected={setMenuSelected}
                      setCartaVini={setCartaVini}
                      setListaViniScelti={setListaViniScelti}
                      setNomeVinoSelezionato={setNomeVinoSelezionato}
                    />
                  ))}
                </Col>
              </Col>
            </Row>
            {/* SELEZIONE VINI */}
            <section className="mb-5">
              <h4 className=" mb-4 mt-2 fs-3" style={{ color: "#ccb7a9" }}>
                Seleziona i vini per la serata
              </h4>
              <div className="d-flex flex-column mb-4">
                <p className={`text-light mb-0 ${styles.copyOptions}`}>
                  Prepara il tuo palato per un'esperienza culinaria
                  straordinaria con i vini raccomandati dallo chef.
                </p>
                <p className={`text-light ${styles.copyOptions}`}>
                  Affidati alla sua expertise e lasciati guidare attraverso un
                  viaggio di sapori e abbinamenti perfetti.
                </p>
                <p className={`text-light ${styles.copyOptions}`}>
                  Lo chef ha selezionato personalmente una varietà di vini
                  pregiati, capaci di esaltare al meglio i piatti del menu e
                  creare un'armonia di gusto e aromi.
                </p>
              </div>
              {menuSelected?.length === 0 && (
                <div className={`${styles.winesContainer} px-3`}>
                  <p style={{ color: "#ccb7a9" }}>
                    Seleziona il menu per accedere alla selezione dei vini
                  </p>
                </div>
              )}
              {menuSelected?.length > 0 && (
                <div className={`${styles.winesContainer}`}>
                  {cartaVini?.length > 0 &&
                    cartaVini.map((v) => (
                      <div key={v?.id}>
                        <Vino
                          vino={v}
                          id={v?.id}
                          nomeVino={nomeVinoSelezionato}
                          listaViniScelti={listaViniScelti}
                          setListaViniScelti={setListaViniScelti}
                          onClick={() => handleWineSelector(v?.name)}
                        />
                      </div>
                    ))}
                </div>
              )}
            </section>
            {/* CONTROLLO CHECKOUT */}
            {(verifica() && (
              <GeneralButton
                text="Vai al checkout"
                onClick={() => handleDispatch(carrello)}
              />
            )) || (
              <>
                <h5 style={{ color: COLORS.brandGold }}>Per continuare:</h5>
                {!numeroCommensali && (
                  <p className={`text-light mb-0 ${styles.copyOptions}`}>
                    Seleziona numero partecipanti
                  </p>
                )}
                {!dateSelected && (
                  <p className={`text-light mb-0 ${styles.copyOptions}`}>
                    Seleziona data
                  </p>
                )}
                {!menuSelected.length && (
                  <p className={`text-light mb-0 ${styles.copyOptions}`}>
                    Seleziona menu
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
