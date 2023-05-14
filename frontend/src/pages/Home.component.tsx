import { useEffect, useState } from "react";
import HomeBody from "../components/HomeBody/HomeBody.component";
import Jumbotron from "../components/Jumbotron/Jumbotron.component";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { fetchCity } from "../redux/reducers/tokenStore";
import { Col, Row } from "react-bootstrap";
import logo from "../assets/blackLogoNoBg.png";
import style from "./Home.module.css";

const Home = () => {
  const reduxToken = useAppSelector((state) => state.authToken?.token);
  const reduxUsername = useAppSelector((state) => state.authToken?.username);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const user = {
    username: reduxUsername,
    token: reduxToken,
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });

  useEffect(() => {
    if (reduxToken) {
      dispatch(fetchCity(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxToken]);

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
        {/* {reduxToken && <Jumbotron />} */}
      </>
    </div>
  );
};

export default Home;
