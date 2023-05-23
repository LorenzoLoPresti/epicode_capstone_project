import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import COLORS from "../../style/color";
import styles from "./Header.module.css";
import MyButton from "../Button/NavButton/MyButton.component";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/store/store";
import Modal from "../Modal/Modal.component";
import { useAppSelector } from "../../redux/store/store";
import { fetchToken, logout, user } from "../../redux/reducers/tokenStore";
import { FiUser } from "react-icons/fi";
import blackLogoNoBg from "../../assets/blackLogoNoBg.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu.component";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [navScroll, setNavScroll] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [warning, setWarning] = useState(false);
  // const [clicked, setClicked] = useState(false);
  const reduxUsername = useAppSelector((state) => state.authToken?.username);
  const navigate = useNavigate();

  const user: user = {
    username,
    password,
  };

  const token = useAppSelector((state) => state.authToken?.token);
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

  // useEffect(() => {
  //   if (clicked) {
  //     setWarning(true);
  //   }
  // }, [clicked]);

  useEffect(() => {
    if (token) {
      setShowAuthModal(false);
      setWarning(false);
    }
  }, [token, warning]);

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
            text={"Checkout"}
            onClick={() => {
              navigate("/checkout");
              setShowMenu(false);
            }}
          />
          <SideMenu.Command
            text="Logout"
            onClick={() => {
              dispatch(logout());
              setShowMenu(false);
              navigate("/");
            }}
          />
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
                <>
                  <Nav.Link
                    onClick={() => {
                      setShowMenu(true);
                    }}
                    className={` ${styles.username} ${styles.userIconOptions} me-2 fs-6`}
                  >
                    <FiUser />
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowMenu(true);
                    }}
                    className={`${styles.username} me-1`}
                  >
                    Ciao {reduxUsername}{" "}
                  </Nav.Link>
                </>
              )}
              {/* <MyButton text="Sign In" onClick={() => setShowAuthModal(true)} /> */}

              <Nav.Link className={`${styles.navLink} d-none d-md-block`}>
                Contacts
              </Nav.Link>
              <NavLink
                to={"/checkout"}
                className={`${styles.navLink} d-none d-lg-block`}
              >
                Checkout
              </NavLink>
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
              onClose={() => {
                setShowAuthModal(false);
                setWarning(false);
              }}
              title="Accedi a Grand Bistrot"
              subtitle="Login"
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              warning={warning}
              pswWarning={warning}
            >
              {/* <p className="text-light">
                Non hai un account?{" "}
                <Link to="/register" onClick={() => setShowAuthModal(false)}>
                  Registrati
                </Link>
              </p> */}
              <MyButton
                text="Sign Up"
                onClick={() => {
                  setWarning(false);
                  // setClicked(false);
                  dispatch(fetchToken(user));
                  setUsername("");
                  setPassword("");
                  // setClicked(true);
                  setWarning(true);
                }}
                style={{
                  backgroundColor: `${COLORS.brandGold}`,
                  color: `${COLORS.brandBlack}`,
                  marginTop: "2rem",
                }}
              />
            </Modal>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
