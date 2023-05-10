import { Col, Container, Row } from "react-bootstrap";
import styles from "./HomeBody.module.css";
import logoGold from "../../assets/goldLogo.png";

const HomeBody = () => {
  return (
    <div className={`${styles.goldContainer}`}>
      <Container>
        <Row className={`${styles.titleOptions} d-flex pt-5`}>
          <Col xs={12} lg={6} className="text-center d-flex align-items-center">
            <h3 className="fs-1">
              Un'esperienza culinaria senza pari, dal comfort della tua casa.
            </h3>
          </Col>
          <Col
            className="d-none d-sm-block text-center pb-5"
            style={{
              backgroundImage: `url(${logoGold})`,
              backgroundSize: "cover",
              height: "400px",
            }}
          ></Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeBody;
