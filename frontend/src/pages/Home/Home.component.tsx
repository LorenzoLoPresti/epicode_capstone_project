import { useEffect, useState } from "react";
import AboutUs from "../../components/About us/AboutUs.component";
import Jumbotron from "../../components/Jumbotron/Jumbotron.component";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { addRistoranti, fetchCity } from "../../redux/reducers/tokenStore";
import { Col, Row } from "react-bootstrap";
import logo from "../../assets/blackLogoNoBg.png";
// import ristorante from "/src/assets/ristoranti/aroma_roma.jpg";
import style from "./Home.module.css";
import { fetchRistorantiPerCitta } from "../../components/Utils/Utils";
import { Ristorante } from "./Home.types";
import MyCarousel from "../../components/Carousel/MyCarousel.component";
import {
  addUsernameToCart,
  removeChefToCart,
} from "../../redux/reducers/carrelloStore";
import Footer from "../../components/Footer/Footer.component";

const Home = () => {
  const reduxToken = useAppSelector((state) => state.authToken?.token);
  const reduxUsername = useAppSelector((state) => state.authToken?.username);
  const reduxCitta = useAppSelector((state) => state.authToken?.citta);
  const reduxCarrelloUsername = useAppSelector(
    (state) => state.carrelloReducer?.username
  );
  const reduxRistoranti = useAppSelector(
    (state) => state.authToken?.ristoranti
  );
  const [loading, setLoading] = useState(true);
  const [ristoranti, setRistoranti] = useState<Ristorante[]>([]);
  const dispatch = useAppDispatch();

  // UTENTE
  const user = {
    username: reduxUsername,
    token: reduxToken,
  };

  // LOADING
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, [reduxToken]);

  useEffect(() => {
    if (reduxToken) {
      dispatch(fetchCity(user));
    }
    if (reduxCitta && reduxToken) {
      fetchRistorantiPerCitta(reduxToken, reduxCitta, setRistoranti);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxToken, reduxCitta]);

  useEffect(() => {
    if (reduxCitta && reduxToken && reduxCitta && ristoranti.length > 0) {
      dispatch(addRistoranti(ristoranti));
    }
    if (reduxCarrelloUsername !== reduxUsername) {
      dispatch(removeChefToCart());
      dispatch(addUsernameToCart(reduxUsername));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ristoranti]);

  return (
    <div>
      <>
        {/* CARICAMENTO SE UTENTE NON LOGGATO (PER JUMBOTRON) */}
        {!reduxToken && loading && (
          <div className={style.generalContainerOption}>
            <Row className="" style={{ height: "100%" }}>
              <Col
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <div className={`${style.logoContainerOptions}`}>
                  <img className={style.imgOptions} src={logo} />
                </div>
              </Col>
            </Row>
          </div>
        )}
        {/* MOSTRA JUMBOTRON SE UTENTE NON LOGGATO */}
        {!reduxToken && (
          <>
            <Jumbotron />
            {!loading && <AboutUs />}
          </>
        )}
        {/* CAROSELLO RISTORANTI SE UTENTE LOGGATO */}
        {reduxToken && reduxRistoranti.length > 0 && (
          <MyCarousel array={reduxRistoranti} />
        )}
        {/* FOOTER */}
        {!loading && !reduxToken && <Footer />}
      </>
    </div>
  );
};

export default Home;
