import { Col, Container, Row } from "react-bootstrap";
import styles from "./HomeBody.module.css";

const HomeBody = () => {
  return (
    <Container>
      <div className={`${styles.titleOptions} pt-5`}>
        <h3 className="text-center fs-1">
          Un'esperienza culinaria senza pari, dal comfort della tua casa.
        </h3>
      </div>

      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default HomeBody;
