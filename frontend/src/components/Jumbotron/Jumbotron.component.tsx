import styles from "./Jumbotron.module.css";
import styleModal from "../Modal/Modal.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
// import { useAppDispatch } from "../../redux/store/store";
import MyButton from "../Button/NavButton/MyButton.component";
import Modal from "../Modal/Modal.component";
import COLORS from "../../style/color";
import { useAppSelector } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";

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
  const [citta, setCitta] = useState("");
  const [exists, setExists] = useState(false);
  const token = useAppSelector((state) => state.authToken?.token);
  const navigate = useNavigate();

  const cleanField = () => {
    setUsername("");
    setPassword("");
    setCitta("");
    setEmail("");
    setName("");
    setLastname("");
  };

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
  // const storeTry = useAppSelector((state) => state.authToken.token);
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

  // const handleSubmit = () => {
  //   registerRequest()
  //     .then(() => {
  //       cleanField();
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const dispatch = useAppDispatch();
  return (
    <div className={`${styles.jumboOptions}`}>
      <div className={`${styles.jumboContainerOptions}`}>
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
          {showRegistrationModal && (
            <Modal
              onClose={() => setShowRegistrationModal(false)}
              title="Accedi a Grand Bistrot"
              subtitle="registrati ora"
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              warning={exists}
            >
              <input
                value={name}
                className={`mb-5 mb-md-3 ${styleModal.inputOptions}`}
                type="text"
                placeholder="nome"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                value={lastname}
                className={`mb-5 mb-md-3 ${styleModal.inputOptions}`}
                type="text"
                placeholder="cognome"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
              <input
                value={email}
                className={`mb-5 mb-md-3 ${styleModal.inputOptions} ${
                  exists && "bg-warning"
                }`}
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                value={citta}
                className={`mb-5 mb-md-3 ${styleModal.inputOptions}`}
                type="text"
                placeholder="citta"
                onChange={(e) => {
                  setCitta(e.target.value);
                }}
              />
              <MyButton
                text="Sign Up"
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
