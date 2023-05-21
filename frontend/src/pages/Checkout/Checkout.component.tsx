import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import accedi from "../../assets/accediImg.jpg";
import styles from "./Checkout.module.css";
import { useAppSelector } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";
import { ListaProdotti } from "../Home/Home.types";

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
          <Container className="w-100 h-100 p-5">
            <Row
              className="d-flex justify-content-center align-items-center text-light h-100 w-100"
              style={{ padding: "5rem 3rem 3rem" }}
            >
              {token && !cartChecker() && (
                <Col
                  className={`d-flex flex-column justify-content-center align-items-center h-100 ${styles.registerOptions}`}
                >
                  (
                  <>
                    <h3>Il tuo carrello è vuoto</h3>
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                      <p className="text-warning" style={{ cursor: "pointer" }}>
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
                    className={`d-flex flex-column h-100 pt-3 px-3 ${styles.registerOptions}`}
                  >
                    <Col xs={12} className={`${styles.tableOptions} mb-4`}>
                      <h3>Il tuo carrello</h3>
                    </Col>
                    <Col xs={12} className="px-0 mb-3">
                      <div
                        className={`d-flex justify-content-between ${styles.tableOptions}`}
                      >
                        <div>
                          <p>Prodotti aggiunti</p>
                          {listaProdottiMenu !== undefined &&
                            listaProdottiMenu?.map((p) => (
                              <p key={"nomePiatto:" + p?.id} className="ms-3">
                                {p?.name}
                              </p>
                            ))}
                          {listaVini?.length !== undefined &&
                            listaVini?.map((v, i) => (
                              <p key={"nomeVino:" + i} className="ms-3">
                                {v?.name}
                              </p>
                            ))}
                        </div>

                        <div className="d-flex">
                          <div className="text-center">
                            <p>Prezzo</p>
                            {listaProdottiMenu !== undefined &&
                              listaProdottiMenu?.map((p) => (
                                <p key={"prezzoPiatto:" + p?.id}>{p?.prezzo}</p>
                              ))}
                            {listaVini?.length !== undefined &&
                              listaVini?.map((v, i) => (
                                <p key={"prezzoVino" + i}>{v?.prezzo}</p>
                              ))}
                          </div>

                          <div className="text-center">
                            <p className="ms-3">Quantità</p>
                            {listaProdottiMenu !== undefined &&
                              listaProdottiMenu?.map((p) => (
                                <p
                                  key={"numeroPiatto" + p?.id}
                                  className="ms-3"
                                >
                                  {numeroCommensali}
                                </p>
                              ))}
                            {listaVini?.length !== undefined &&
                              listaVini?.map((_, i) => (
                                <p key={"numeroVino" + i} className="ms-3">
                                  {listaVini?.length}
                                </p>
                              ))}
                          </div>
                          {/* <p className="ms-3">Totale</p> */}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-between">
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
                      <div>
                        {Object.entries(conteggioVini).map(([id, quantita]) => {
                          const prodotto = listaVini?.find(
                            (p) => p.id.toString() === id
                          );
                          const nomeProdotto = prodotto ? prodotto.name : "";
                          return (
                            <p key={id}>
                              Nome: {nomeProdotto}, Quantità: {quantita}
                            </p>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </Row>
          </Container>
        </div>
      </div>

      {/* {showAuthModal && (
    <Modal
      onClose={() => setShowAuthModal(false)}
      title="Accedi a Grand Bistrot"
      subtitle="login"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    >
      <MyButton
        text="Sign Up"
        onClick={() => {
          dispatch(fetchToken(user));
          setUsername("");
          setPassword("");
        }}
        style={{
          backgroundColor: `${COLORS.brandGold}`,
          color: `${COLORS.brandBlack}`,
        }}
      />
    </Modal>
  )} */}
    </>
  );
};

export default Checkout;
