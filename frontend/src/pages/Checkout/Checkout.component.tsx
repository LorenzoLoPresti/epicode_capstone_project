import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import accedi from "../../assets/accediImg.jpg";
import styles from "./Checkout.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";
import { ListaProdotti } from "../Home/Home.types";
import COLORS from "../../style/color";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { removeChefToCart } from "../../redux/reducers/carrelloStore";
import { jsPDF } from "jspdf";
import logo from "../../assets/whiteLogoNoBg.png";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authToken?.token);
  const navigate = useNavigate();
  const chef = useAppSelector((state) => state.carrelloReducer?.chef);
  const numeroCommensali = useAppSelector(
    (state) => state.carrelloReducer?.numeroCommensali
  );
  const dataCena = useAppSelector((state) => state.carrelloReducer?.dataCena);
  const listaProdottiMenu = useAppSelector(
    (state) => state.carrelloReducer?.listaProdottiMenu
  );
  const listaVini = useAppSelector((state) => state.carrelloReducer?.listaVini);
  const [prezzoChef, setPrezzoChef] = useState(0);
  const [prezzoPiatti, setPrezzoPiatti] = useState<number>(0);
  const [prezzoVini, setPrezzoVini] = useState<number>(0);
  const [orderFulfilled, setOrderFulfilled] = useState(false);

  // DETERMINA SE IL CARRELLO E' VUOTO
  const cartChecker = () =>
    dataCena === null && listaProdottiMenu === null ? false : true;

  // SETTA IL VALORE DEI COSTI PER CHEF, MENU E VINI
  const totale = () => {
    let tempoChef;
    let costoChef;
    let costoPiattiTotale;

    // TEMPO TOTALE CHEF
    const tempo = listaProdottiMenu?.map((t) => t?.tempoDiPreparazione);
    const tempoTotale = tempo?.reduce((acc, tempo) => acc + tempo + 15, 0);
    if (tempoTotale !== undefined) {
      tempoChef = Math.ceil(tempoTotale / 60);
      costoChef = chef!.tariffaOraria * tempoChef;
    } else {
      return console.error();
    }

    // COSTO PIATTI PER NUMERO DI PARTECIPANTI
    const piatti = listaProdottiMenu?.map((p) => p?.prezzo);
    costoPiattiTotale = piatti?.reduce(
      (acc, costoPiatto) => acc + costoPiatto,
      0
    );

    if (costoPiattiTotale !== undefined) {
      costoPiattiTotale *= numeroCommensali;
      setPrezzoPiatti(costoPiattiTotale);
    }

    // COSTO DEI VINI
    const vini = listaVini?.map((v) => v?.prezzo);
    const costoVini = vini?.reduce((acc, costoVino) => acc + costoVino, 0);

    if (costoVini) {
      listaVini!.length > 0 ? setPrezzoVini(costoVini) : setPrezzoVini(0);
    }

    // PREZZO CHEF
    setPrezzoChef(costoChef);
  };

  // CONTEGGIO DELLE BOTTIGLIE
  const contaVini = (
    carrello: ListaProdotti[] | null
  ): Record<string, number> => {
    const conteggio: Record<string, number> = {};

    carrello?.forEach((prodotto) => {
      const { id } = prodotto;
      if (conteggio[id]) {
        conteggio[id]++;
      } else {
        conteggio[id] = 1;
      }
    });

    return conteggio;
  };

  const conteggioVini = contaVini(listaVini);

  // SUBTOTALE
  const subTotale = () => {
    if (prezzoPiatti && prezzoVini === 0) {
      return prezzoPiatti + prezzoVini;
    }
    if (prezzoPiatti && prezzoVini !== 0 && prezzoVini) {
      return prezzoPiatti + prezzoVini;
    }
  };

  // PREZZO TOTALE
  const prezzoTotale = prezzoPiatti + prezzoVini + prezzoChef;

  // SENZA TOKEN REDIRECT ALLA LOGIN PAGE
  useEffect(() => {
    if (!token) {
      const t = setInterval(() => navigate("/login"), 1500);
      return () => clearInterval(t);
    }
    totale();
  }, []);

  const [pdfData, setPdfData] = useState<Blob | null>(null);

  // CREAZIONE RICEVUTA PDF
  const generatePDF = (
    prezzo: number,
    nomeChef: string | undefined,
    numeroCommensali: number,
    dataCena: string | null
  ) => {
    const doc = new jsPDF();

    const imageSrc = logo;

    const imgWidth = 50;
    const imgHeight = 27;

    const centraLogo = (doc.internal.pageSize.getWidth() - imgWidth) / 2;

    doc.addImage(imageSrc, "JPEG", centraLogo, 10, imgWidth, imgHeight);
    doc.setFont("helvetica");
    doc.setTextColor("#303030");
    doc.text("Grazie per aver scelto Grand Bistrot Homecooking!", 10, 60);
    doc.text(`Chef scelto: ${nomeChef}`, 10, 70);
    doc.text(`Numero di partecipanti: ${numeroCommensali}`, 10, 80);
    doc.text(`Data cena: ${dataCena}`, 10, 90);
    doc.text(`Totale: ${prezzo}€`, 10, 105);

    // Salva il documento come file
    const generatedPdfData = doc.output("blob");
    setPdfData(generatedPdfData);
  };

  return (
    <>
      <div
        className={styles.bg}
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${accedi})`,
          backgroundSize: "cover",
        }}
      >
        <div className={`${styles.containerOptions}`}>
          <Container className="w-100 h-100 pt-5 px-xs-1 px-md-5">
            <Row
              className="d-flex justify-content-center align-items-center text-light h-100 w-100"
              style={{ padding: "5rem 0", margin: "0", minHeight: "100vh" }}
            >
              {/* SE UTENTE NON LOGGATO */}
              {!token && (
                <Col
                  className={`d-flex flex-column justify-content-center align-items-center 50vh $
                   ${styles.voidCart}`}
                >
                  <div className={styles.animationContainer}>
                    <p>
                      Effettua il login per accedere alle funzionalità del sito
                    </p>
                  </div>
                </Col>
              )}
              {/* SE UTENTE LOGGATO E CARRELLO VUOTO */}
              {token && !cartChecker() && (
                <Col
                  className={`d-flex flex-column justify-content-center align-items-center 50vh $
                   ${styles.voidCart}`}
                >
                  <div className={styles.animationContainer}>
                    <h3>
                      {(orderFulfilled && "Grazie per il tuo acquisto!") ||
                        "Il tuo carrello è vuoto"}
                    </h3>

                    <Link to={"/"} style={{ textDecoration: "none" }}>
                      <p
                        className="mb-2"
                        style={{ cursor: "pointer", color: COLORS.brandGold }}
                      >
                        Clicca qui per andare ai ristoranti
                      </p>
                    </Link>
                    {orderFulfilled && (
                      <div className={`${styles.animationContainer}`}>
                        {pdfData && (
                          <p>
                            <a
                              style={{ color: COLORS.brandWhite }}
                              href={URL.createObjectURL(pdfData)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Clicca qui per la ricevuta
                            </a>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {!token && (
                    <p>
                      Effettua il login per accedere alle funzionalità del sito
                    </p>
                  )}
                </Col>
              )}
              {/* SE UTENTE LOGGATO E CARRELLO PIENO */}
              {token && cartChecker() && (
                <div className={` ${styles.modalOptions}`}>
                  <Row
                    className={`d-flex flex-column h-100 pt-3 px-4 ${styles.animationContainer}`}
                  >
                    <Col
                      xs={12}
                      className={`${styles.tableOptions} mb-4 d-flex justify-content-between align-items-center`}
                    >
                      <h3>Il tuo carrello</h3>
                      <p
                        onClick={() => dispatch(removeChefToCart())}
                        style={{ cursor: "pointer", color: COLORS.brandGold }}
                      >
                        Svuota carrello
                      </p>
                    </Col>
                    <Col xs={12} className="px-0 mb-3">
                      <Row className={`d-flex justify-content-between`}>
                        <Row className="mb-3">
                          <Col xs={7} sm={8}>
                            <p className="mb-2">Prodotti aggiunti</p>
                          </Col>
                          <Col className="text-center" xs={3} sm={2}>
                            <p className="mb-2">Prezzo</p>
                          </Col>
                          <Col className="text-center" xs={2}>
                            <p className="mb-2">Qt.</p>
                          </Col>
                        </Row>
                        <Row className="ps-3">
                          <Col>
                            <p
                              style={{
                                fontSize: "0.825rem",
                                color: COLORS.brandGold,
                              }}
                            >
                              MENU
                            </p>
                          </Col>
                        </Row>
                        {/* ELEMENTI DEL MENU */}
                        {listaProdottiMenu !== undefined &&
                          listaProdottiMenu?.map((p) => (
                            <Row
                              className="mb-3 ps-3"
                              key={"nomePiatto:" + p?.id}
                            >
                              <Col
                                className="d-flex align-items-center"
                                xs={7}
                                sm={8}
                              >
                                {p?.name}
                              </Col>
                              <Col
                                className="d-flex align-items-center justify-content-center"
                                xs={3}
                                sm={2}
                              >
                                {p?.prezzo}€
                              </Col>
                              <Col
                                className="d-flex align-items-center justify-content-center"
                                xs={2}
                              >
                                {numeroCommensali}
                              </Col>
                            </Row>
                          ))}
                        {/* LISTA VINI */}
                        {listaVini!.length > 0 && (
                          <Row className="ps-3 mt-2">
                            <Col>
                              <p
                                style={{
                                  fontSize: "0.825rem",
                                  color: COLORS.brandGold,
                                }}
                              >
                                VINI
                              </p>
                            </Col>
                          </Row>
                        )}
                        {listaVini!.length > 0 &&
                          Object.entries(conteggioVini).map(
                            ([id, quantita]) => {
                              const prodotto = listaVini?.find(
                                (vino) => vino?.id.toString() === id
                              );
                              const nomeProdotto = prodotto?.name;
                              const prezzo = prodotto?.prezzo;
                              return (
                                <Row className="mb-2 ps-3" key={"idVino:" + id}>
                                  <Col
                                    className="d-flex align-items-center"
                                    xs={7}
                                    sm={8}
                                  >
                                    {nomeProdotto}
                                  </Col>
                                  <Col
                                    className="d-flex align-items-center justify-content-center"
                                    xs={3}
                                    sm={2}
                                  >
                                    {prezzo}€
                                  </Col>
                                  <Col
                                    className="d-flex align-items-center justify-content-center"
                                    xs={2}
                                  >
                                    {quantita}
                                  </Col>
                                </Row>
                              );
                            }
                          )}
                      </Row>
                    </Col>
                    <Row
                      className="d-flex justify-content-center pt-3"
                      style={{ borderTop: "1px solid #faf4f0" }}
                    >
                      {" "}
                      <h4 className="mb-3">Totale</h4>
                      {/* PAYPAL */}
                      <Col
                        xs={12}
                        sm={7}
                        md={8}
                        className={styles.paypalColumn}
                      >
                        <div style={{ width: "200px" }}>
                          {prezzoTotale && (
                            <PayPalScriptProvider
                              options={{
                                currency: "EUR",
                                "client-id": import.meta.env.VITE_CLIENT_ID,
                              }}
                            >
                              <PayPalButtons
                                createOrder={(_data: any, actions: any) => {
                                  return actions.order.create({
                                    purchase_units: [
                                      {
                                        amount: {
                                          value: prezzoTotale,
                                        },
                                      },
                                    ],
                                  });
                                }}
                                onApprove={(_data: any, actions: any) => {
                                  return actions.order
                                    .capture()
                                    .then(function (_details: any) {
                                      // alert(
                                      //   "Transazione andata a buon fine per pippo"
                                      // );
                                      console.log("prezzo: " + prezzoTotale);
                                      dispatch(removeChefToCart());
                                      setOrderFulfilled(true);
                                      generatePDF(
                                        prezzoTotale,
                                        chef?.name,
                                        numeroCommensali,
                                        dataCena
                                      );
                                    });
                                }}
                              />
                            </PayPalScriptProvider>
                          )}
                        </div>
                      </Col>
                      {/* TOTALE CARRELLO */}
                      <Col className="d-flex flex-column align-items-md-center">
                        <p>costo chef: {prezzoChef}€</p>
                        <p>sub-totale: {subTotale()}€</p>
                        <p className="fw-bold fs-5">totale: {prezzoTotale}€</p>
                      </Col>
                    </Row>
                  </Row>
                </div>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Checkout;
