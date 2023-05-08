import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import COLORS from "../../style/color";
import styles from "./Header.module.css";
import MyButton from "../Button/MyButton.component";
import { useState } from "react";
import Modal from "../Modal/Modal.component";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <Navbar bg="none" expand="lg" fixed="top">
      <Container className="justify-content-center">
        <Row
          className="d-flex justify-content-between w-100 py-4"
          style={{
            borderBottom: "1px ridge" + COLORS.brandWhite,
          }}
        >
          <Col>
            <Navbar.Brand
              style={{
                color: COLORS.brandWhite,
              }}
            >
              Restaurant-app
            </Navbar.Brand>
          </Col>
          <Col
            className="d-flex flex-row-reverse"
            style={{ color: COLORS.brandWhite }}
          >
            <MyButton
              text="Sign Up"
              onClickFnc={() => setShowAuthModal(!showAuthModal)}
            />
            <Nav.Link className={`${styles.navLink} d-none d-md-block`}>
              Contacts
            </Nav.Link>
            <Nav.Link className={`${styles.navLink} d-none d-md-block`}>
              About us
            </Nav.Link>
          </Col>
        </Row>
        {showAuthModal && (
          <Modal onClose={() => setShowAuthModal(false)} title="capra">
            <Modal.Body>Ciao</Modal.Body>
            <Modal.Footer>Capra</Modal.Footer>
          </Modal>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
