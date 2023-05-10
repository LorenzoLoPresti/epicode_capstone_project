import styles from "./Jumbotron.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "../../redux/store/store";
import { fetchToken, user } from "../../redux/reducers/tokenStore";
import MyButton from "../Button/MyButton.component";
import Modal from "../Modal/Modal.component";
import COLORS from "../../style/color";

const Jumbotron = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user: user = {
    username,
    password,
  };

  // const storeTry = useAppSelector((state) => state.authToken.token);
  const dispatch = useAppDispatch();
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
              <div className="text-center text-sm-start">
                <MyButton
                  text="Iniziamo"
                  onClickFnc={() => setShowRegistrationModal(true)}
                />
              </div>
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
            >
              <input
                value={username}
                className="mb-3"
                type="text"
                placeholder="nome"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                value={username}
                className="mb-3"
                type="text"
                placeholder="cognome"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
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
      </div>
    </div>
  );
};

export default Jumbotron;
