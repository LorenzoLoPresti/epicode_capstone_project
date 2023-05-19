import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import styles from "./Shop.module.css";
import { Col, Row } from "react-bootstrap";
import AccordionMenu from "../AccordionMenu/AccordionMenu.component";

export interface AccordionItem {
  title: string;
  content: string;
}

const Shop = () => {
  const ristorante = useAppSelector((state) => state.authToken?.ristoranti);
  const { nomeRistorante } = useParams();
  const chefSelezionato = useAppSelector(
    (state) => state.carrelloReducer?.chef
  );

  // const accordionItems: AccordionItem[] = [
  //   {
  //     title: "Accordion Item #1",
  //     content: "Contenuto dell'Accordion Item #1",
  //   },
  //   {
  //     title: "Accordion Item #2",
  //     content: "Contenuto dell'Accordion Item #2",
  //   },
  //   {
  //     title: "Accordion Item #3",
  //     content: "Contenuto dell'Accordion Item #3",
  //   },
  // ];

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
          <Row className=" py-5 mb-4 flex-column">
            <Col className={`${styles.chefNameContainer} mb-4`}>
              <h1 className={`text-light ${styles.chefName}`}>
                Il menu di {chefSelezionato?.name}
              </h1>
            </Col>
            <Col className="my-4">
              <h4 className=" mb-4 fs-3" style={{ color: "#ccb7a9" }}>
                Seleziona il menu per la tua serata
              </h4>
              <div className="d-flex flex-column">
                <p className={`text-light ${styles.copyOptions}`}>
                  Per soddisfare i gusti più raffinati e gli appetiti più
                  esigenti i nostri chef esperti creano piatti prelibati
                  utilizzando ingredienti freschi e di alta qualità, combinando
                  sapori innovativi e tradizionali.
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
                <p className={`mb-5 text-light ${styles.copyOptions}`}>
                  Scegli il tuo menu e prenota ora per una serata
                  indimenticabile.
                </p>
              </div>
            </Col>
            <Row>
              <Col
                className={`${styles.chefImage}`}
                xs={12}
                lg={4}
                style={{
                  backgroundImage: `url(${chefSelezionato?.immagineCucina})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Col>
              <Col lg={8}>
                <div>
                  {chefSelezionato?.listaMenu.map((s, i) => (
                    <AccordionMenu
                      key={i}
                      opzione={i + 1}
                      selezione={s?.selezione}
                    />
                  ))}
                </div>
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Shop;
