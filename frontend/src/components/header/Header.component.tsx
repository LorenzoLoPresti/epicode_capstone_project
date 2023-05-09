import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import COLORS from "../../style/color";
import styles from "./Header.module.css";
import MyButton from "../Button/MyButton.component";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal.component";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [stato, setStato] = useState([]);

  const authRequest = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        const data = (await response).json();
        const value = await data.then((e) => e.accessToken);
        setStato(value);
        setToken(value);
        //data.then((e) => console.log(e));
        console.log(data); //TOKEN
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(stato);
  }, [token]);

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
              text="Sign Up"
              onClickFnc={() => setShowAuthModal(!showAuthModal)}
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
          <Modal onClose={() => setShowAuthModal(false)}>
            <Row className="d-flex">
              <Col xs={6} className="p-0">
                {/* <Modal.Body> */}
                <div
                  className="d-flex flex-column p-5 text-light"
                  style={{
                    backgroundImage: `url("https://static1.bigstockphoto.com/4/8/2/large1500/284139886.jpg")`,
                    backgroundSize: "cover",
                    width: "530px",
                    height: "570px",
                  }}
                >
                  <h2
                    className="m-0"
                    style={{
                      fontSize: "3rem",
                      fontFamily: "'Abril Fatface', cursive",
                    }}
                  >
                    Gourmet
                  </h2>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: "100",
                    }}
                  >
                    a casa tua
                  </h3>
                </div>
                {/* </Modal.Body> */}
              </Col>
              <Col xs={6} className="pe-3">
                {/* <Modal.Footer> */}
                <div className="d-flex flex-column align-items-center py-5">
                  <h2 className="fs-3 pt-3 fw-bold">Wanna try?</h2>
                  <p className="mb-5">create new account</p>
                  <div className="d-flex flex-column px-5">
                    <input
                      value={username}
                      className="mb-3"
                      type="text"
                      placeholder="username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <input
                      value={password}
                      className="mb-5"
                      type="text"
                      placeholder="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <MyButton
                      text="Sign Up"
                      onClickFnc={() => {
                        authRequest();
                      }}
                      style={{
                        backgroundColor: `${COLORS.brandGold}`,
                        color: `${COLORS.brandBlack}`,
                      }}
                    />
                  </div>
                  {token && (
                    <p className="fs-4 text-center">{`Bearer ${token}`}</p>
                  )}
                </div>
                {/* </Modal.Footer> */}
              </Col>
            </Row>
            {/* <Modal.Body>Ciao</Modal.Body>
            <Modal.Footer>Capra</Modal.Footer> */}
          </Modal>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
