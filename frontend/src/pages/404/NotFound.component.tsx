// import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./NotFound.module.css";
import notFound from "../../assets/notFoundImg.jpg";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";

const NotFound = () => {
  const reduxToken = useAppSelector((state) => state.authToken?.token);

  return (
    <div
      //   className={styles.bg}
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${notFound})`,
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
              className={`d-flex flex-column align-items-center justify-content-center text-center ${styles.modal}`}
            >
              <div className="d-flex align-items-center">
                <h1 className={`${styles.notFound}`}>404 </h1>
                <AiFillQuestionCircle
                  className={`${styles.notFoundIcon} mb-2`}
                />
              </div>
              <div className="mb-3 fs-5 px-md-4">
                <p>
                  Siamo spiacenti ma la pagina cercata non esiste o è stata
                  cancellata
                </p>
              </div>
              <div>
                {!reduxToken && (
                  <p>
                    <Link to={"/login"} className={`${styles.link} me-1`}>
                      Accedi
                    </Link>
                    o torna alla
                    <Link to={"/"} className={`${styles.link} ms-1`}>
                      Homepage
                    </Link>
                  </p>
                )}
                {reduxToken && (
                  <p>
                    Torna alla
                    <Link to={"/"} className={`${styles.link} ms-1`}>
                      Homepage
                    </Link>
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default NotFound;
