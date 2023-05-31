import styles from "./Jumbotron.module.css";
import styleModal from "../Modal/Modal.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
// import { useAppDispatch } from "../../redux/store/store";
import MyButton from "../Button/NavButton/MyButton.component";
import Modal from "../Modal/Modal.component";
import COLORS from "../../style/color";
import { useAppSelector } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";

// import video from "../../../../../../../255472_Chef Carbon_Dioxide Dry Ice Nouvelle_Cuisine_By_LACOFILMS_Artlist_HD.mp4";

// interface user {
//   name: string;
//   lastName: string;
//   username: string;
//   email: string;
//   password: string;
//   citta: string;
// }

const Jumbotron = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [citta, setCitta] = useState("");
  const [exists, setExists] = useState(false);
  const token = useAppSelector((state) => state.authToken?.token);
  const navigate = useNavigate();

  // RESETTA I CAMPI DEL FORM DI REGISTRAZIONE
  const cleanField = () => {
    setUsername("");
    setPassword("");
    setCitta("");
    setEmail("");
    setName("");
    setLastname("");
  };

  // CONTROLLO DEI CAMPI DEL FORM
  const valueCheck = () => {
    if (
      username.length > 2 &&
      password.length > 2 &&
      name.length > 2 &&
      lastname.length > 2 &&
      email.length > 2 &&
      citta.length > 2 &&
      email.includes("@")
    ) {
      return true;
    } else {
      return false;
    }
  };

  // REGISTRA NUOVO UTENTE
  const registerRequest = async () => {
    setExists(false);
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastname,
          username,
          email,
          password,
          citta,
        }),
      });
      if (response.status === 400) {
        setExists(true);
      }
      if (response.ok) {
        console.log(response.body?.pipeTo);

        cleanField();

        setTimeout(() => {
          setShowRegistrationModal(false);
          navigate("/login");
        }, 1200);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCitta(value);
  };

  return (
    // JUMBOTRON
    <div className={`${styles.jumboOptions}`}>
      <div className={`${styles.jumboContainerOptions}`}>
        {/* <video
          src={video}
          autoPlay
          loop
          muted
          className={styles.backVideo}
        ></video> */}
        <Container className={`${styles.jumboSpacing}`}>
          <Row className={`${styles.jumboSpacing}`}>
            <Col
              className={`d-flex flex-column justify-content-center ctaContainer ${styles.payofContainer}`}
            >
              <p className={`text-light ${styles.p1Options}`}>
                Luxury Homecooking
              </p>
              <h1 className={`text-light ${styles.h1Options}`}>Gourmet</h1>
              <h2 className={`text-light  ${styles.h2Options}`}>a casa tua</h2>
              {!token && (
                <div className="text-center text-sm-start">
                  <MyButton
                    text="Iniziamo"
                    onClick={() => setShowRegistrationModal(true)}
                  />
                </div>
              )}
            </Col>
          </Row>
          {/* MODALE DI REGISTRAZIONE */}
          {showRegistrationModal && (
            <Modal
              onClose={() => setShowRegistrationModal(false)}
              title="Accedi a Grand Bistrot"
              subtitle="Registrati ora"
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              warning={exists}
            >
              <div className={styleModal.inputBox}>
                <input
                  value={name}
                  className={`mb-5 mb-md-3 ${styleModal.inputOptions}`}
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <label className={styleModal.label}>Nome</label>
              </div>
              <div className={styleModal.inputBox}>
                <input
                  value={lastname}
                  className={`mb-5 mb-md-3 ${styleModal.inputOptions}`}
                  type="text"
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  required
                />
                <label className={styleModal.label}>Cognome</label>
              </div>
              <div className={styleModal.inputBox}>
                <input
                  value={email}
                  className={`mb-5 mb-md-3 ${styleModal.inputOptions} ${
                    !isEmailValid && email.length > 0 ? styleModal.invalid : ""
                  }`}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(e.target.validity.valid);
                  }}
                  required
                />
                <label className={styleModal.label}>Email</label>
              </div>
              <div className={styleModal.inputBox}>
                <select
                  className={styleModal.dropdown}
                  value={citta}
                  id="dropdown"
                  onChange={(event) => handleOptionChange(event)}
                  required
                >
                  <option className={styleModal.dropdownOptions} value="">
                    Scegli dopo
                  </option>
                  <option className={styleModal.dropdownOptions} value="Roma">
                    Roma
                  </option>
                  <option className={styleModal.dropdownOptions} value="Milano">
                    Milano
                  </option>
                </select>
              </div>
              <p className="text-light mt-2 mb-4">
                Già registrato?{" "}
                <Link
                  to={"/login"}
                  style={{ color: COLORS.brandGold, textDecoration: "none" }}
                >
                  Effettua il login
                </Link>
              </p>
              <MyButton
                text="Registrati"
                onClick={() => {
                  // handleSubmit();
                  if (valueCheck()) {
                    try {
                      registerRequest();
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
                style={{
                  backgroundColor: `${COLORS.brandGold}`,
                  color: `${COLORS.brandBlack}`,
                }}
              />
            </Modal>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Jumbotron;
