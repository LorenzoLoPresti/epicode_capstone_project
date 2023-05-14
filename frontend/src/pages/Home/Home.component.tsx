import { useEffect, useState } from "react";
import HomeBody from "../../components/HomeBody/HomeBody.component";
import Jumbotron from "../../components/Jumbotron/Jumbotron.component";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { fetchCity } from "../../redux/reducers/tokenStore";
import { Col, Row } from "react-bootstrap";
import logo from "../../assets/blackLogoNoBg.png";
// import ristorante from "/src/assets/ristoranti/aroma_roma.jpg";
import style from "./Home.module.css";
import { fetchRistorantiPerCitta } from "../../components/Utils/Utils";
import { Ristorante } from "./Home.types";
import MyCarousel from "../../components/Carousel/MyCarousel.component";

const Home = () => {
  const reduxToken = useAppSelector((state) => state.authToken?.token);
  const reduxUsername = useAppSelector((state) => state.authToken?.username);
  const reduxCitta = useAppSelector((state) => state.authToken?.citta);
  const [loading, setLoading] = useState(true);
  const [ristoranti, setRistoranti] = useState<Ristorante[]>([]);
  const dispatch = useAppDispatch();

  const user = {
    username: reduxUsername,
    token: reduxToken,
  };

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduxToken) {
      dispatch(fetchCity(user));
      // fetchRistorantiPerCitta(reduxToken, reduxCitta, setRistoranti);
    }
    if (reduxCitta && reduxToken) {
      fetchRistorantiPerCitta(reduxToken, reduxCitta, setRistoranti);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxToken, reduxCitta]);

  return (
    <div>
      <>
        {loading && (
          <div className={style.generalContainerOption}>
            <Row className="w-100" style={{ height: "100%" }}>
              <Col
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <div className={`${style.logoContainerOptions}`}>
                  <img className={style.imgOptions} src={logo} />
                </div>
              </Col>
            </Row>
          </div>
        )}
        {!reduxToken && (
          <>
            <Jumbotron />
            {!loading && <HomeBody />}
          </>
        )}
        {ristoranti.length > 0 && (
          // <Carousel>
          //   {ristoranti?.map((e) => (
          //     <Carousel.Item interval={100000000}>
          //       <div>
          //         <div
          //           className="d-block w-100"
          //           style={{
          //             backgroundImage: `url(${e?.immagine})`,
          //             height: "100vh",
          //             backgroundSize: "cover",
          //           }}
          //         ></div>
          //       </div>
          //     </Carousel.Item>
          //   ))}
          // </Carousel>
          <MyCarousel array={ristoranti} />
        )}
      </>
    </div>
  );
};

export default Home;
