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
// import logo from "../../assets/blackLogoNoBg.png";

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

  // CAMPI DI INPUT
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [pswInvalid, setPswInvalid] = useState(false);
  const [cittaInvalid, setCittaInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [nameInvalid, setNameInvalid] = useState(false);
  const [lastnameInvalid, setLastnameInvalid] = useState(false);

  // RESETTA I CAMPI DEL FORM DI REGISTRAZIONE
  const cleanField = () => {
    setUsername("");
    setPassword("");
    setCitta("");
    setEmail("");
    setName("");
    setLastname("");
  };

  // RESET CAMPI
  const cancelValidation = () => {
    setUsernameInvalid(false);
    setPswInvalid(false);
    setCittaInvalid(false);
    setEmailInvalid(false);
    setNameInvalid(false);
    setLastnameInvalid(false);
  };

  // CONTROLLO DEI CAMPI DEL FORM
  const valueCheck = () => {
    cancelValidation();
    if (
      username.length > 2 &&
      password.length > 2 &&
      name.length > 2 &&
      lastname.length > 2 &&
      email.length > 2 &&
      (citta === "Roma" || citta === "Milano") &&
      email.includes("@")
    ) {
      return true;
    }
    if (username.length <= 2) setUsernameInvalid(true);
    if (password.length <= 2) setPswInvalid(true);
    if (name.length <= 2) setNameInvalid(true);
    if (lastname.length <= 2) setLastnameInvalid(true);
    if (!email.includes("@") && email.length <= 2) setEmailInvalid(true);
    if (citta !== "Roma" && citta !== "Milano") setCittaInvalid(true);

    console.log(usernameInvalid);
    console.log(pswInvalid);
    console.log(nameInvalid);
    console.log(lastnameInvalid);
    console.log(emailInvalid);
    console.log(cittaInvalid);

    return false;
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
        }, 400);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCitta(value);
  };

  // CREAZIONE RICEVUTA PDF
  // const generatePDF = () => {
  //   const doc = new jsPDF();

  //   const imageSrc = logo;

  //   const imgWidth = 50;
  //   const imgHeight = 27;

  //   const centraLogo = (doc.internal.pageSize.getWidth() - imgWidth) / 2;

  //   doc.addImage(imageSrc, "JPEG", centraLogo, 10, imgWidth, imgHeight);
  //   doc.setFont("Montserrat");
  //   doc.setFontSize(15);
  //   doc.setTextColor(COLORS.brandBlack);
  //   const linesWidth = doc.internal.pageSize.getWidth() - 20;
  //   doc.setLineWidth(0.3); // Imposta lo spessore della linea a 2
  //   doc.setDrawColor(COLORS.brandGold); // Imposta il colore della linea a rosso
  //   doc.line(20, 42, linesWidth, 42); // Linea orizzontale da (20, 20) a (100, 20)

  //   doc.text("Cliente: nome", 20, 60);
  //   doc.text(`Chef scelto: Gus`, 20, 70);
  //   doc.text(`Numero di partecipanti: 1`, 20, 80);
  //   doc.text(`Data cena: 2021/04/23`, 20, 90);

  //   doc.line(20, 105, linesWidth, 105);
  //   doc.text(`Tariffa Chef: 20€`, 20, 123);
  //   doc.setFontSize(19);
  //   doc.text(`Totale: 118€`, 20, 138);

  //   doc.setFontSize(14);
  //   doc.text(`Grazie per aver scelto GrandBistrot Homecooking!`, 20, 158);
  //   doc.text(`2021/04/23`, linesWidth - 25, 178);

  //   const generatedPdfData = doc.output("blob");
  //   setPdfData(generatedPdfData);
  // };

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
              <div
                className={`${styleModal.inputBox} ${
                  nameInvalid && styleModal.invalidInput
                }`}
              >
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
              <div
                className={`${styleModal.inputBox} ${
                  lastnameInvalid && styleModal.invalidInput
                }`}
              >
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
              <div
                className={`${styleModal.inputBox} ${
                  emailInvalid && styleModal.invalidInput
                }`}
              >
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
              <div
                className={`${styleModal.inputBox} ${
                  cittaInvalid && styleModal.invalidInput
                }`}
              >
                <select
                  className={styleModal.dropdown}
                  value={citta}
                  id="dropdown"
                  onChange={(event) => handleOptionChange(event)}
                  required
                >
                  <option className={styleModal.dropdownOptions} value="">
                    Scegli citta
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
