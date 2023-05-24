// import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import styles from "./Contatti.module.css";
import COLORS from "../../style/color";
import { BsInstagram } from "react-icons/bs";
import { CiFacebook } from "react-icons/ci";
import { ImPinterest2 } from "react-icons/im";
import contattiImg from "../../assets/contattiImg.jpg";

const Contatti = () => {
  return (
    <div
      //   className={styles.bg}
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${contattiImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className={`${styles.containerOptions}`}>
        <Container className="w-100 h-100 pt-5 px-1 px-md-5">
          <Row
            className="d-flex justify-content-center align-items-center text-light h-100 w-100"
            style={{ padding: "5rem 0", margin: "0", minHeight: "100vh" }}
          >
            <Col
              className={`d-flex p-3 p-sm-5 flex-column justify-content-center ${styles.modal}`}
            >
              <Row className="flex-column">
                <Col className="mb-5">
                  <h1 style={{ color: COLORS.brandGold }}>Contatti</h1>
                </Col>
                <Col>
                  <p className={`fs-5 mb-4 ${styles.popup}`}>
                    Siamo felici di poter entrare in contatto con te e
                    rispondere a qualsiasi domanda o richiesta tu possa avere.
                    Qui di seguito troverai i nostri dettagli di contatto:
                  </p>
                  <ul className={`${styles.socialList} ${styles.popup} mb-4`}>
                    <li>
                      <span
                        className="me-2"
                        style={{ color: COLORS.brandGold }}
                      >
                        Indirizzo:
                      </span>
                      Via Italia, 1234, Città, Italia
                    </li>
                    <li>
                      <span
                        className="me-2"
                        style={{ color: COLORS.brandGold }}
                      >
                        Telefono:
                      </span>
                      +39 123 456789
                    </li>
                    <li>
                      <span
                        className="me-2"
                        style={{
                          color: COLORS.brandGold,
                          wordBreak: "break-word",
                        }}
                      >
                        Email:
                      </span>
                      info@grandbistrot.com
                    </li>
                  </ul>
                  <p className={`fs-5 mb-4 ${styles.popup}`}>
                    Oppure vieni a trovarci su:
                  </p>
                  <ul className={`${styles.socialList} ${styles.popup} mb-4`}>
                    <li className={styles.linkTransition}>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        style={{
                          textDecoration: "none",
                          color: COLORS.brandWhite,
                        }}
                      >
                        <BsInstagram className="me-2" />
                      </a>

                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        style={{
                          color: COLORS.brandGold,
                          textDecoration: "none",
                        }}
                      >
                        Instagram
                      </a>
                    </li>
                    <li className={styles.linkTransition}>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        style={{
                          textDecoration: "none",
                          color: COLORS.brandWhite,
                        }}
                      >
                        <CiFacebook className="me-2" />
                      </a>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        style={{
                          color: COLORS.brandGold,
                          textDecoration: "none",
                        }}
                      >
                        Facebook
                      </a>
                    </li>
                    <li className={styles.linkTransition}>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        style={{
                          textDecoration: "none",
                          color: COLORS.brandWhite,
                        }}
                      >
                        <ImPinterest2 className="me-2" />
                      </a>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        style={{
                          color: COLORS.brandGold,
                          textDecoration: "none",
                        }}
                      >
                        Pinterest
                      </a>
                    </li>
                  </ul>
                  <p className={`fs-5 ${styles.popup}`}>
                    Se hai bisogno di assistenza riguardo ai nostri servizi,
                    desideri informazioni aggiuntive o vuoi prenotare una cena
                    gourmet,
                    <span className="ms-1" style={{ color: COLORS.brandGold }}>
                      non esitare a contattarci
                    </span>
                    . Il nostro team di supporto dedicato sarà lieto di aiutarti
                    e fornirti tutte le informazioni di cui hai bisogno.
                  </p>
                  <p className={`fs-5 ${styles.popup}`}>
                    Inoltre, se sei un ristorante stellato e desideri
                    collaborare con noi per offrire i tuoi piatti eccezionali
                    attraverso Grand Bistrot Homecooking,
                    <span className="ms-1" style={{ color: COLORS.brandGold }}>
                      siamo interessati a sentire la tua proposta
                    </span>
                    . Contattaci tramite l'indirizzo email sopra indicato e
                    saremo lieti di discutere le possibilità di partnership.
                  </p>
                </Col>
                <Col>
                  <p className={`fs-5 ${styles.popup}`}>
                    Non vediamo l'ora di sentirti e di offrirti un'esperienza
                    culinaria straordinaria con Grand Bistrot Homecooking.
                  </p>
                  <p className={`fs-5  mb-5 ${styles.popup}`}>
                    Grazie per il tuo interesse e la tua fiducia nel nostro
                    servizio.
                  </p>
                  <p className={`fs-5 ${styles.popup}`}>Ti aspettiamo!</p>
                  <p
                    className={`fs-5 ${styles.popup}`}
                    style={{ color: COLORS.brandGold }}
                  >
                    Il Team di GrandBistrot Homecooking
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Contatti;
