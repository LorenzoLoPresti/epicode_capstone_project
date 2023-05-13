import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import COLORS from "../../style/color";
import styles from "./Header.module.css";
import MyButton from "../Button/MyButton.component";
import { useState } from "react";
import { useAppDispatch } from "../../redux/store/store";
import Modal from "../Modal/Modal.component";
import { useAppSelector } from "../../redux/store/store";
import { fetchToken, logout, user } from "../../redux/reducers/tokenStore";
// import { RootState } from "../../redux/store/store";
import blackLogoNoBg from "../../assets/blackLogoNoBg.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu.component";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [navScroll, setNavScroll] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const reduxUsername = useAppSelector((state) => state.authToken?.username);
  const navigate = useNavigate();

  const user: user = {
    username,
    password,
  };

  const storeTry = useAppSelector((state) => state.authToken.token);
  const dispatch = useAppDispatch();

  // const handleScroll = () => {
  //   if (window.scrollY >= 100) {
  //     setNavScroll(true);
  //   } else {
  //     setNavScroll(false);
  //   }
  // };

  // window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", () =>
    window.scrollY >= 100 ? setNavScroll(true) : setNavScroll(false)
  );

  return (
    <>
      {showMenu && (
        <SideMenu
          onClose={() => setShowMenu(false)}
          flex={true}
          directionColumn={true}
        >
          <SideMenu.Headline text={`ciao ${reduxUsername}`}></SideMenu.Headline>
          <SideMenu.Command
            text="Logout"
            onClick={() => {
              dispatch(logout());
              setShowMenu(false);
              navigate("/");
            }}
          ></SideMenu.Command>
        </SideMenu>
      )}
      <Navbar
        className={`${navScroll ? styles.navbarScroll : styles.navStyle}`}
        expand="lg"
        fixed="top"
      >
        <Container className="justify-content-center">
          <Row
            className={`d-flex justify-content-between w-100 ${
              !navScroll && styles.navBorder
            }`}
          >
            <Col className="py-1 d-flex align-items-center">
              <Navbar.Brand
                className="d-none d-sm-block"
                style={{
                  color: COLORS.brandWhite,
                }}
              >
                <Link to={"/"}>
                  <img
                    className={`${styles.logoOptions}`}
                    src={blackLogoNoBg}
                    alt=""
                  />
                </Link>
              </Navbar.Brand>
            </Col>
            <Col
              className="d-flex flex-row-reverse py-4"
              style={{ color: COLORS.brandWhite }}
            >
              {!reduxUsername ? (
                <MyButton
                  text="Sign In"
                  onClick={() => setShowAuthModal(true)}
                />
              ) : (
                <Nav.Link
                  onClick={() => {
                    setShowMenu(true);
                  }}
                  className={`${styles.username} d-none d-md-block`}
                >
                  Ciao {reduxUsername}
                </Nav.Link>
              )}
              {/* <MyButton text="Sign In" onClick={() => setShowAuthModal(true)} /> */}

              <Nav.Link
                onClick={() => {
                  dispatch(logout());
                }}
                className={`${styles.navLink} d-none d-md-block`}
              >
                Contacts
              </Nav.Link>
              <Nav.Link className={`${styles.navLink} d-none d-lg-block`}>
                About us
              </Nav.Link>
              {/* Approfondire discorso NAvLink (active automatico) */}
              <NavLink
                className={`${styles.navLink} d-none d-md-block`}
                to={"/"}
              >
                Home
              </NavLink>
            </Col>
          </Row>
          {showAuthModal && (
            <Modal
              onClose={() => setShowAuthModal(false)}
              title="Accedi a Grand Bistrot"
              subtitle="login"
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            >
              <MyButton
                text="Sign Up"
                onClick={() => {
                  dispatch(fetchToken(user));
                  setUsername("");
                  setPassword("");
                }}
                style={{
                  backgroundColor: `${COLORS.brandGold}`,
                  color: `${COLORS.brandBlack}`,
                }}
              />
              {storeTry && (
                <div style={{ maxWidth: "100px", paddingRight: "8px" }}>
                  <p>{`bearer ${storeTry}`}</p>
                </div>
              )}
            </Modal>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
