import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import accedi from "../../assets/accediImg.jpg";
import styles from "./Checkout.module.css";
import { useAppSelector } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";
import { ListaProdotti } from "../Home/Home.types";
import COLORS from "../../style/color";

const Checkout = () => {
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
  const [prezzoPiatti, setPrezzoPiatti] = useState<number | undefined>();
  const [prezzoVini, setPrezzoVini] = useState<number | undefined>(0);

  const cartChecker = () =>
    chef === null && dataCena === null && listaProdottiMenu === null
      ? false
      : true;

  const totale = () => {
    let tempoChef;
    let costoChef;
    let costoPiattiTotale;

    const tempo = listaProdottiMenu?.map((t) => t?.tempoDiPreparazione);
    const tempoTotale = tempo?.reduce((acc, tempo) => acc + tempo + 15, 0);
    if (tempoTotale !== undefined) {
      tempoChef = Math.ceil(tempoTotale / 60);
      costoChef = chef!.tariffaOraria * tempoChef;
    } else {
      return console.error();
    }

    const piatti = listaProdottiMenu?.map((p) => p?.prezzo);
    costoPiattiTotale = piatti?.reduce(
      (acc, costoPiatto) => acc + costoPiatto,
      0
    );
    if (costoPiattiTotale !== undefined) costoPiattiTotale *= numeroCommensali;

    const vini = listaVini?.map((v) => v?.prezzo);
    const costoVini = vini?.reduce((acc, costoVino) => acc + costoVino, 0);

    setPrezzoChef(costoChef);
    setPrezzoPiatti(costoPiattiTotale);
    setPrezzoVini(costoVini);

    console.log(prezzoChef, prezzoVini, prezzoPiatti);
  };

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

  useEffect(() => {
    if (!token) {
      const t = setInterval(() => navigate("/login"), 2000);
      return () => clearInterval(t);
    }
    totale();
  }, []);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${accedi})`,
          backgroundSize: "cover",
        }}
      >
        <div className={`${styles.loginContainerOptions}`}>
          <Container className="w-100 h-100 pt-5 px-xs-1 px-md-5">
            <Row
              className="d-flex justify-content-center align-items-center text-light h-100 w-100"
              style={{ padding: "5rem 0", margin: "0" }}
            >
              {token && !cartChecker() && (
                <Col
                  className={`d-flex flex-column justify-content-center align-items-center h-100 ${styles.registerOptions}`}
                >
                  (
                  <>
                    <h3>Il tuo carrello è vuoto</h3>
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                      <p style={{ cursor: "pointer", color: COLORS.brandGold }}>
                        Clicca qui per andare ai ristoranti
                      </p>
                    </Link>
                  </>
                  {!token && (
                    <p>
                      Effettua il login per accedere alle funzionalità del sito
                    </p>
                  )}
                </Col>
              )}
              {token && cartChecker() && (
                <>
                  <Row
                    className={`d-flex flex-column h-100 pt-3 px-4 ${styles.registerOptions}`}
                  >
                    <Col xs={12} className={`${styles.tableOptions} mb-4`}>
                      <h3>Il tuo carrello</h3>
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
                            <p className="mb-2">Quantità</p>
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
                                {p?.prezzo}
                              </Col>
                              <Col
                                className="d-flex align-items-center justify-content-center"
                                xs={2}
                              >
                                {numeroCommensali}
                              </Col>
                            </Row>
                          ))}
                        <Row className="ps-3">
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
                        {Object.entries(conteggioVini).map(([id, quantita]) => {
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
                                {prezzo}
                              </Col>
                              <Col
                                className="d-flex align-items-center justify-content-center"
                                xs={2}
                              >
                                {quantita}
                              </Col>
                            </Row>
                          );
                        })}
                      </Row>
                    </Col>
                    <Col
                      xs={12}
                      className="d-flex justify-content-between pt-3"
                      style={{ borderTop: "1px solid #faf4f0" }}
                    >
                      <h4>Totale</h4>
                      <div>
                        <p>costo chef: {prezzoChef}€</p>
                        <p>
                          sub-totale:{" "}
                          {prezzoPiatti &&
                            prezzoVini &&
                            prezzoPiatti + prezzoVini}
                          €
                        </p>
                        <p>
                          totale:{" "}
                          {prezzoPiatti &&
                            prezzoVini &&
                            prezzoChef &&
                            prezzoPiatti + prezzoVini + prezzoChef}
                          €
                        </p>
                      </div>
                      {/* <button
                        onClick={() => {
                          Object.entries(contaVini(listaVini)).map(
                            ([id, quantita]) => {
                              const prodotto = listaVini?.find(
                                (prodotto) => prodotto?.id.toString() === id
                              );
                              console.log(prodotto, quantita);
                            }
                          );
                        }}
                      >
                        controllo
                      </button> */}
                    </Col>
                  </Row>
                </>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Checkout;
