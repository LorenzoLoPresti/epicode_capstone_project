import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import COLORS from "../../style/color";
import styles from "./Header.module.css";
import MyButton from "../Button/MyButton.component";
import { useState } from "react";
import Modal from "../Modal/Modal.component";
import { useAppDispatch } from "../../redux/store/store";
// import { useAppSelector } from "../../redux/store/store";
import { fetchToken, user } from "../../redux/reducers/tokenStore";
// import { RootState } from "../../redux/store/store";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user: user = {
    username,
    password,
  };

  // const storeTry = useAppSelector((state) => state.authToken.token);
  const dispatch = useAppDispatch();

  return (
    <Navbar className={`${styles.navStyle}`} expand="lg" fixed="top">
      <Container className="justify-content-center">
        <Row
          className="d-flex justify-content-between w-100 py-4"
          style={{
            borderBottom: "1px ridge" + COLORS.brandWhite,
          }}
        >
          <Col>
            <Navbar.Brand
              className="d-none d-sm-block"
              style={{
                color: COLORS.brandWhite,
              }}
            >
              Luxury Homecooking
            </Navbar.Brand>
          </Col>
          <Col
            className="d-flex flex-row-reverse"
            style={{ color: COLORS.brandWhite }}
          >
            <MyButton
              text="Sign In"
              onClickFnc={() => setShowAuthModal(true)}
            />
            <Nav.Link className={`${styles.navLink} d-none d-md-block`}>
              Contacts
            </Nav.Link>
            <Nav.Link className={`${styles.navLink} d-none d-lg-block`}>
              About us
            </Nav.Link>
            <Nav.Link className={`${styles.navLink} d-none d-md-block`}>
              Home
            </Nav.Link>
          </Col>
        </Row>
        {showAuthModal && (
          <Modal
            onClose={() => setShowAuthModal(false)}
            title="Accedi a Luxury Homecooking"
            subtitle="registrati ora"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          >
            <MyButton
              text="Sign Up"
              onClickFnc={() => {
                dispatch(fetchToken(user));
              }}
              style={{
                backgroundColor: `${COLORS.brandGold}`,
                color: `${COLORS.brandBlack}`,
              }}
            />
          </Modal>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
