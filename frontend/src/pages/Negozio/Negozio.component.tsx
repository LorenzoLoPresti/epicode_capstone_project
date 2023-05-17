import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import { Col, Row } from "react-bootstrap";
import styles from "./Negozio.module.css";
import Chef from "../../components/Chef/ChefElement.component";
import { useState } from "react";

const Negozio = () => {
  const { nomeRistorante } = useParams();
  const ristorante = useAppSelector((state) => state.authToken?.ristoranti);
  const [selected, setSelected] = useState(0);

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
          {ristorante.length > 0 &&
            ristorante
              ?.filter((ristorante) => ristorante.name === nomeRistorante)
              .map((e) => (
                <>
                  <Row
                    className=" py-5 mb-4"
                    style={{ flexDirection: "row-reverse" }}
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
                      className={`${styles.colNameOptions} mx-0 d-flex`}
                    >
                      <h2 className={`${styles.colName}`}>{e?.name}</h2>
                    </Col>
                  </Row>
                  <div className="w-100 ">
                    <h4 className=" mb-4 fs-3" style={{ color: "#ccb7a9" }}>
                      Seleziona il tuo chef
                    </h4>
                    <div className="d-flex ">
                      <p
                        className="mb-5 w-50 text-light"
                        style={{ fontSize: "1.1rem" }}
                      >
                        Lo chef da te selezionato si recherà a casa tua portando
                        con se tutto l'occorrente per una cena indimenticabile
                      </p>
                    </div>
                  </div>
                  <Row className="px-2">
                    {e?.listaChef.map((chef) => (
                      <Col
                        className={`p-0 ${
                          selected !== 0 && selected !== chef.id && "d-none"
                        }`}
                        lg={4}
                      >
                        <Chef
                          selected={selected}
                          setSelected={setSelected}
                          chef={chef}
                        ></Chef>
                      </Col>
                    ))}
                    <Col className="w-100 px-5">
                      {selected === 0 && (
                        <div className="text-light">
                          Seleziona uno chef per continuare
                        </div>
                      )}
                      {e?.listaChef
                        .filter((chef) => chef?.id === selected)
                        .map((chefSelected) => (
                          <div
                            className={`${styles.selectChef} py-5 text-light`}
                          >
                            <p>{chefSelected?.name}</p>
                          </div>
                        ))}
                    </Col>
                    {/* {e?.listaChef.map((chef) => (
                      <Col className={` pb-5 px-4`} lg={4}>
                        <Chef
                          selected={selected}
                          setSelected={() => {
                            setSelected(e?.id);
                            console.log(selected);
                          }}
                          chef={chef}
                        ></Chef>
                      </Col>
                    ))} */}
                  </Row>
                </>
              ))}
        </div>
      </div>

      {/* // <div  onClick={() => console.log(ristorante)}
            //   className="d-flex justify-content-center align-items-center"
            //   style={{ height: "500px", width: "500px" }}
            // >
            //   {e?.listaChef[i].name}
            // </div> */}
    </>
  );
};

export default Negozio;
