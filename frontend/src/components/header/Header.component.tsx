import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import COLORS from "../../style/color";
import styles from "./Header.module.css";
import styleModal from "../Modal/Modal.module.css";
import MyButton from "../Button/NavButton/MyButton.component";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/store/store";
import Modal from "../Modal/Modal.component";
import { useAppSelector } from "../../redux/store/store";
import {
  addRistoranti,
  fetchToken,
  logout,
  user,
} from "../../redux/reducers/tokenStore";
import { FiUser } from "react-icons/fi";
import blackLogoNoBg from "../../assets/blackLogoNoBg.png";
import whiteLogoNoBg from "../../assets/whiteLogoNoBg.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu.component";
import { darkNav } from "../../redux/reducers/navbarStore";
import { fetchRistorantiPerCitta } from "../Utils/Utils";
import { Ristorante } from "../../pages/Home/Home.types";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [navScroll, setNavScroll] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [warning, setWarning] = useState(false);
  const [citta, setCitta] = useState("");

  const [ristoranti, setRistoranti] = useState<Ristorante[]>([]);
  const navbarColor = useAppSelector((state) => state.navbarReducer?.dark);
  const reduxCitta = useAppSelector((state) => state.authToken?.citta);
  const reduxUsername = useAppSelector((state) => state.authToken?.username);
  const reduxToken = useAppSelector((state) => state.authToken?.token);
  const navigate = useNavigate();

  const user: user = {
    username,
    password,
  };

  const token = useAppSelector((state) => state.authToken?.token);
  const dispatch = useAppDispatch();

  window.addEventListener("scroll", () =>
    window.scrollY >= 100 ? setNavScroll(true) : setNavScroll(false)
  );

  const putCittaUtente = async (
    username: string,
    token: string,
    citta: string
  ) => {
    const response = await fetch(
      `http://localhost:8080/grand_bistrot/users/edit/${username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: citta,
      }
    );
    if (response.ok) {
      console.log("PIPPONE");
    } else {
      console.log("STEFAN1");
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCitta(value);
  };

  // useEffect(() => {
  //   if (clicked) {
  //     setWarning(true);
  //   }
  // }, [clicked]);

  useEffect(() => {
    if (citta.length && token) {
      fetchRistorantiPerCitta(token, citta, setRistoranti);
    }
    if (citta !== reduxCitta && reduxToken) {
      putCittaUtente(reduxUsername, reduxToken, citta);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citta]);

  useEffect(() => {
    if (ristoranti.length) {
      dispatch(addRistoranti(ristoranti));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ristoranti]);

  useEffect(() => {
    if (token) {
      setShowAuthModal(false);
      setWarning(false);
    }
  }, [token, warning]);

  useEffect(() => {
    if (!token) {
      dispatch(darkNav(false));
    }
  }, []);

  return (
    <>
      {showMenu && (
        <SideMenu setShowMenu={setShowMenu} flex={true} directionColumn={true}>
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

          <div className={styleModal.inputBox}>
            <select
              className={styleModal.dropdown}
              value={citta}
              id="dropdown"
              onChange={(event) => handleOptionChange(event)}
              required
            >
              <option className={styleModal.dropdownOptions} value="">
                Seleziona città
              </option>
              <option className={styleModal.dropdownOptions} value="Roma">
                Roma
              </option>
              <option className={styleModal.dropdownOptions} value="Milano">
                Milano
              </option>
            </select>
          </div>
        </SideMenu>
      )}
      <Navbar
        className={`${navScroll ? styles.navbarScroll : styles.navStyle} ${
          navbarColor && styles.navDarkStyle
        }`}
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
                style={{
                  color: COLORS.brandWhite,
                }}
              >
                <Link to={"/"}>
                  <img
                    className={`${styles.logoOptions}`}
                    src={!navbarColor ? blackLogoNoBg : whiteLogoNoBg}
                    alt="logo"
                  />
                </Link>
              </Navbar.Brand>
            </Col>
            <Col
              className="d-flex flex-row-reverse py-4"
              style={{ color: COLORS.brandWhite }}
            >
              {!reduxUsername ? (
                <div className="d-flex align-items-center">
                  <MyButton
                    icon={true}
                    text="Accedi"
                    onClick={() => setShowAuthModal(true)}
                  />
                </div>
              ) : (
                <>
                  <Nav.Link
                    onClick={() => {
                      setShowMenu(true);
                    }}
                    className={` ${styles.username} ${
                      navbarColor && styles.usernameDark
                    } ${styles.userIconOptions} me-2 fs-6`}
                  >
                    <FiUser />
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowMenu(true);
                    }}
                    className={`${styles.username} ${
                      navbarColor && styles.usernameDark
                    } me-1`}
                  >
                    {reduxUsername}{" "}
                  </Nav.Link>
                </>
              )}
              {/* <MyButton text="Sign In" onClick={() => setShowAuthModal(true)} /> */}

              <NavLink
                to={"/contatti"}
                className={`${styles.navLink} ${
                  navbarColor && styles.navLinkDark
                } d-none d-lg-block`}
              >
                Contatti
              </NavLink>
              <NavLink
                to={"/checkout"}
                className={`${styles.navLink} ${
                  navbarColor && styles.navLinkDark
                } d-none d-sm-block`}
              >
                Checkout
              </NavLink>
              {/* Approfondire discorso NAvLink (active automatico) */}
              <NavLink
                className={`${styles.navLink} ${
                  navbarColor && styles.navLinkDark
                } d-none d-lg-block`}
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
                icon={true}
                text="Accedi"
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
