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
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { TiContacts } from "react-icons/ti";
import { SlHome } from "react-icons/sl";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [navScroll, setNavScroll] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningPsw, setWarningPsw] = useState(false);
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

  // const token = useAppSelector((state) => state.authToken?.token);
  const dispatch = useAppDispatch();

  // CAMBIO COLORE ALLA NAVBAR ALLO SCROLL
  window.addEventListener("scroll", () =>
    window.scrollY >= 100 ? setNavScroll(true) : setNavScroll(false)
  );

  // CONTROLLO MODALE LOGIN

  const cancelValidation = () => {
    setWarning(false);
    setWarningPsw(false);
  };

  // CONTROLLO DEI CAMPI DEL FORM
  const valueCheck = () => {
    cancelValidation();
    if (username.length > 2 && password.length > 2) {
      return true;
    }
    if (username.length <= 2) setWarning(true);
    if (password.length <= 2) setWarningPsw(true);

    return false;
  };

  // CHIAMATA PER CAMBIARE CITTA UTENTE DALLA SIDEBAR
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
      console.log("Success");
    } else {
      console.log("Fail");
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      setCitta(value);
    }
  };

  // useEffect(() => {
  //   if (clicked) {
  //     setWarning(true);
  //   }
  // }, [clicked]);

  useEffect(() => {
    if (citta.length && reduxToken) {
      fetchRistorantiPerCitta(reduxToken, citta, setRistoranti);
    }
    if (citta !== reduxCitta && citta && reduxToken) {
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
    if (reduxToken) {
      setShowAuthModal(false);
      setWarning(false);
    }
  }, [reduxToken, warning]);

  useEffect(() => {
    setWarning(false);
    if (!reduxToken) {
      dispatch(darkNav(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* MENU LATERALE */}
      {showMenu && (
        <SideMenu setShowMenu={setShowMenu} flex={true} directionColumn={true}>
          <div
            className="d-flex align-items-center"
            // style={{ borderBottom: "1px solid white" }}
          >
            <FiUser className="text-light me-2 fs-4" />
            <SideMenu.Headline
              text={`ciao ${reduxUsername}`}
            ></SideMenu.Headline>
          </div>
          <div style={{ padding: `min(20vh, 10rem) 0` }}>
            <div className={`${styleModal.inputBox} mb-4 mt-0`}>
              <select
                className={`${styleModal.dropdown}`}
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
            <div className="d-flex align-items-center mb-4 pt-2">
              <SlHome className="text-light me-2 fs-4" />
              <SideMenu.Command
                text={"Home"}
                onClick={() => {
                  navigate("/");
                  setShowMenu(false);
                }}
              />
            </div>
            <div className="d-flex align-items-center mb-4">
              <AiOutlineShoppingCart className="text-light me-2 fs-4" />
              <SideMenu.Command
                text={"Checkout"}
                onClick={() => {
                  navigate("/checkout");
                  setShowMenu(false);
                }}
              />
            </div>
            <div className="d-flex align-items-center mb-4">
              <TiContacts className="text-light me-2 fs-4" />
              <SideMenu.Command
                text="Contatti"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/contatti");
                }}
              />
            </div>
            <div className="d-flex align-items-center">
              <FiLogOut className="text-light me-2 fs-4" />
              <SideMenu.Command
                text="Logout"
                onClick={() => {
                  dispatch(logout());
                  setShowMenu(false);
                  navigate("/");
                }}
              />
            </div>
          </div>
        </SideMenu>
      )}
      {/* NAVBAR */}
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
          {/* MODALE LOGIN */}
          {showAuthModal && (
            <Modal
              onClose={() => {
                setShowAuthModal(false);
                cancelValidation();
              }}
              title="Accedi a Grand Bistrot"
              subtitle="Login"
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              warning={warning}
              pswWarning={warningPsw}
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
                  if (valueCheck()) {
                    dispatch(fetchToken(user));
                    setUsername("");
                    setPassword("");
                  }
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
