import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { Col, Row } from "react-bootstrap";
import styles from "./Negozio.module.css";
import Chef from "../../components/Chef/ChefElement.component";
import { useState } from "react";
import React from "react";
import { ListaMenu } from "../Home/Home.types";
import { useEffect } from "react";
import GeneralButton from "../../components/Button/GeneralButton/GeneralButton.component";
import { addChefToCart } from "../../redux/reducers/carrelloStore";
// import { ListaProdotti } from "../Home/Home.types";

const Negozio = () => {
  const { nomeRistorante } = useParams();
  const ristorante = useAppSelector((state) => state.authToken?.ristoranti);
  const token = useAppSelector((state) => state.authToken?.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [listaMenu, setListaMenu] = useState<ListaMenu[]>([]);

  // SETTA LISTA MENU PER IL DETERMINATO CHEF
  const trovaListaMenuPerChefId = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/grand_bistrot/menu/chef_id/${id}`,
        {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Unhautorized");
      }
      const data = await response.json();
      setListaMenu(data);
    } catch (error) {
      return error;
    }
  };

  // RIMUOVE FILTRA PRODOTTI PER NON BEVANDA
  const piattiMenu = listaMenu
    ?.map((p) => p.selezione.filter((p) => p?.categoria !== "BEVANDA"))
    .pop();

  // TROVA CHEF PER NOME ID
  const selezionaChefPerId = (id: number) => {
    const listaChef = ristorante?.find(
      (r) => r?.name === nomeRistorante
    )?.listaChef;

    const chefSelezionato = listaChef?.filter((c) => c.id === id);
    return chefSelezionato![0];
  };

  // CALCOLA TEMPO MEDIO CENA
  const tempoMedioCena = piattiMenu
    ?.map((p) => p.tempoDiPreparazione)
    .reduce((acc, tempo) => acc + tempo + 15, 0);

  useEffect(() => {
    if (selected !== 0) {
      trovaListaMenuPerChefId(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    const verificaRistorante = ristorante.find(
      (r) => r?.name === nomeRistorante
    );
    // console.log(verificaRistorante);
    if (!verificaRistorante) {
      navigate("/");
    }
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
        <div className={`${styles.mainContainer} `}>
          <div className={styles.popup}>
            {ristorante.length > 0 &&
              ristorante
                ?.filter((ristorante) => ristorante.name === nomeRistorante)
                .map((e, i) => (
                  <React.Fragment key={"rist" + i}>
                    <Row
                      className=" py-5 mb-4"
                      style={{ flexDirection: "column-reverse" }}
                    >
                      <Col
                        xs={12}
                        md={6}
                        xxl={6}
                        className={`${styles.colDescriptionOptions} d-flex justify-content-center align-items-center`}
                      >
                        <p className="text-light mb-0 mt-4">{e?.descrizione}</p>
                      </Col>

                      <Col
                        xs={12}
                        md={6}
                        className={`${styles.colNameOptions}  d-flex`}
                      >
                        <h2 className={`${styles.colName}`}>{e?.name}</h2>
                      </Col>
                    </Row>
                    <div className="w-100 ">
                      <h4 className=" mb-4 fs-3" style={{ color: "#ccb7a9" }}>
                        Seleziona il tuo chef
                      </h4>
                      <div className="d-flex ">
                        <p className={`mb-5 text-light ${styles.copyOptions}`}>
                          Lo chef da te selezionato si recherà a casa tua
                          portando con se tutto l'occorrente per una cena
                          indimenticabile
                        </p>
                      </div>
                    </div>
                    <Row className="px-2" key={"ristoranteChef" + e?.id}>
                      {e?.listaChef.map((chef) => (
                        <Col
                          key={"chef" + chef?.id}
                          className={`p-0 mb-4 mb-md-0 ${
                            selected !== 0 && selected !== chef.id && "d-none"
                          }`}
                          sm={7}
                          md={5}
                          xl={4}
                        >
                          <Chef
                            selected={selected}
                            setSelected={setSelected}
                            chef={chef}
                          ></Chef>
                        </Col>
                      ))}
                      <Col className="w-100 px-lg-5">
                        {e?.listaChef
                          .filter((chef) => chef?.id === selected)
                          .map((chefSelected) => (
                            <React.Fragment
                              key={"chefProps" + chefSelected?.id}
                            >
                              <Row
                                className={`${styles.decoration} pt-4 flex-column flex-xl-row`}
                              >
                                <Col className="text-light d-flex flex-column">
                                  <p className={`${styles.selectChef}`}>
                                    {chefSelected?.name}
                                  </p>
                                  <p>{chefSelected?.descrizioneChef}</p>
                                </Col>
                                <Col className="text-light text-center pt-2">
                                  <Row className="flex-column flex-lg-row flex-xl-column">
                                    <Col lg={4} xl={12}>
                                      <p
                                        className={`mb-1 pe-2 pt-1 ${styles.categoryNamesOptions}`}
                                      >
                                        Offerta gastronomica
                                      </p>
                                      <p className={`${styles.infoColor}`}>
                                        {chefSelected?.categoria}
                                      </p>
                                    </Col>
                                    <Col lg={4} xl={12}>
                                      <p
                                        className={`mb-1 ${styles.categoryNamesOptions}`}
                                      >
                                        Tempo cena medio:
                                      </p>
                                      <p className={`${styles.infoColor}`}>
                                        {/* RESTITUISCE MINUTI CENA */}
                                        {(listaMenu.length > 0 &&
                                          tempoMedioCena + " minuti") ||
                                          "variabile"}
                                      </p>
                                    </Col>
                                    <Col lg={4} xl={12}>
                                      <p
                                        className={`mb-1 ${styles.categoryNamesOptions}`}
                                      >
                                        Prezzo orario chef:
                                      </p>
                                      <p className={`${styles.infoColor}`}>
                                        {chefSelected?.tariffaOraria} euro
                                      </p>
                                    </Col>
                                    <Col className="mt-xl-5 mt-lg-3">
                                      <Link
                                        to={`/shop/${nomeRistorante}`}
                                        onClick={() => {
                                          dispatch(
                                            addChefToCart(
                                              selezionaChefPerId(selected)
                                            )
                                          );
                                          console.log(tempoMedioCena);
                                        }}
                                      >
                                        <GeneralButton
                                          text={`Vai ${
                                            (listaMenu?.length === 1 && "al") ||
                                            "ai"
                                          } menu`}
                                        />
                                      </Link>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </React.Fragment>
                          ))}
                      </Col>
                    </Row>
                  </React.Fragment>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Negozio;
