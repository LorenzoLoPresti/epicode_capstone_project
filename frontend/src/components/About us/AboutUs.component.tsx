import { Col, Container, Row } from "react-bootstrap";
import styles from "./AboutUs.module.css";
import logoGold from "../../assets/goldLogo.png";
import restaurant from "../../assets/ristoranti/mirabelle_roma.jpg";
import COLORS from "../../style/color";
import MyCard from "../Card/MyCard.component";
import { TbMap2 } from "react-icons/tb";
import { GrRestaurant } from "react-icons/gr";
import { RiRestaurantLine } from "react-icons/ri";
import { useState } from "react";

const AboutUs = () => {
  const [navScroll, setNavScroll] = useState(false);
  const [title, setTitle] = useState(false);
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 90) {
      setNavScroll(true);
    }
    if (window.scrollY >= 900) {
      setTitle(true);
    }
    if (window.scrollY >= 1400) {
      setC1(true);
      setC2(true);
      setC3(true);
    }
  });
  return (
    <div className={`${styles.goldContainer}`}>
      <Container className="py-5">
        <Row
          className={`${styles.titleOptions} ${navScroll && styles.titleIn} ${
            !navScroll && styles.titleOut
          }  d-flex p-5`}
        >
          <Col xs={12} lg={6}>
            <h4 className={`${styles.about}`}>ABOUT US</h4>
            <h2 className={`${styles.aboutTitle} mb-4`}>
              L'eccellenza stellata direttamente a casa tua
            </h2>
            <p>
              Lasciati sedurre dall'esperienza unica di portare i sapori
              stellati dei migliori bistrot italiani direttamente sulla tua
              tavola.
            </p>
            <p>
              Una selezione di menu gourmet preparati con maestria, ingredienti
              di qualità e la passione culinaria dei grandi chef, per regalare
              momenti di autentica soddisfazione gastronomica nel comfort del
              tuo spazio domestico.
            </p>
            <p className="mb-xl-0">
              Ci impegniamo a offrire solo ingredienti freschi e di alta
              qualità, scelti con cura per garantire un'esperienza di gusto
              straordinaria. Collaboriamo con fornitori locali e produttori
              selezionati, privilegiando ingredienti stagionali e sostenibili,
              per offrire il meglio della cucina italiana e internazionale nelle
              vostre case.
            </p>
          </Col>
          <Col
            lg={6}
            className="justify-content-center align-items-center d-none d-lg-flex"
          >
            <img src={logoGold} alt="" className={styles.img} />
          </Col>
          {/* <Col>
           
          </Col> */}
        </Row>
      </Container>
      <div
        className={styles.bgAbout}
        style={{
          backgroundImage: `url(${restaurant})`,
        }}
      >
        <Row
          className={`m-0 ${styles.gradient} ${title && styles.titleVisible}`}
        >
          <Col
            xs={8}
            sm={6}
            md={4}
            className="offset-md-8 d-flex flex-column py-5 "
            style={{ color: COLORS.brandGold }}
          >
            <div className="pt-5">
              <h4
                className={`${styles.title} ${
                  title && styles.titleVisible
                } mb-4`}
              >
                I nostri ristoranti
              </h4>
            </div>
            <div className="mt-4">
              <p>
                Siamo orgogliosi di essere il tramite tra i ristoranti stellati
                e i nostri clienti, portando un'esperienza culinaria di alto
                livello nelle case di tutti coloro che amano la buona cucina.
              </p>
              <p>
                Scoprite i sapori unici, l'arte e la dedizione che si nascondono
                dietro ogni piatto, e lasciate che HomeCooking Italia trasformi
                le vostre cene in momenti di autentico piacere culinario.
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ backgroundColor: COLORS.brandBlackPlus }}>
        <Container className="py-5">
          <Row className="py-5">
            <Col
              md={4}
              className={`${styles.cOpacity} ${c1 && styles.c1Visible}`}
            >
              <MyCard
                text="Una Raffinata Esperienza Gastronomica"
                desc="Scegli il ristorante e permetti ai nostri chef stellati di portare l'arte della gastronomia direttamente a casa tua."
              >
                <TbMap2 className="fs-1" />
              </MyCard>
            </Col>
            <Col
              md={4}
              className={`${styles.cOpacity} ${c2 && styles.c2Visible}`}
            >
              <MyCard
                text=" Scegli lo chef che risuona con i tuoi gusti"
                desc=" Ogni chef ti offrirà un menu unico, creato con passione e cura, utilizzando ingredienti di prima qualità."
              >
                <GrRestaurant className="fs-2" />
              </MyCard>
            </Col>
            <Col
              md={4}
              className={`${styles.cOpacity} ${c3 && styles.c3Visible}`}
            >
              <MyCard
                text="Rilassati e lascia che lo Chef si prenda cura di te"
                desc="Metti da parte le preoccupazioni e lasciati coccolare mentre lo chef prepara ogni portata con cura."
              >
                <RiRestaurantLine className="fs-2" />
              </MyCard>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;
