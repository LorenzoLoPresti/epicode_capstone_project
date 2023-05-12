import { useEffect, useState } from "react";
import HomeBody from "../components/HomeBody/HomeBody.component";
import Jumbotron from "../components/Jumbotron/Jumbotron.component";
import { useAppSelector } from "../redux/store/store";
import { Col, Row } from "react-bootstrap";
import logo from "../assets/blackLogoNoBg.png";
import style from "./Home.module.css";
// import { useEffect } from "react";

const Home = () => {
  const reduxToken = useAppSelector((state) => state.authToken?.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });

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
      </>
    </div>
  );
};

export default Home;
