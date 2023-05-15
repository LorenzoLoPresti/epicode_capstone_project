import { useState, useEffect } from "react";
// import Modal from "../components/Modal/Modal.component";
import MyButton from "../components/Button/MyButton.component";
import COLORS from "../style/color";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { fetchToken, user } from "../redux/reducers/tokenStore";
import { Col, Container, Row } from "react-bootstrap";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const reduxUsername = useAppSelector((state) => state.authToken?.username);

  const user: user = {
    username,
    password,
  };

  useEffect(() => {
    if (reduxUsername) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxUsername]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundImage: `url("https://moderngarden.co.uk/images/products/_productImageBig/Branch-Tribu-HR-2.jpg")`,
          backgroundSize: "cover",
        }}
      >
        <div className={`${style.loginContainerOptions}`}>
          <Container className="w-100 h-100 p-5">
            <Row className="d-flex justify-content-center align-items-center text-light h-100 w-100 p-5">
              <Col
                className={`d-flex flex-column justify-content-center align-items-center h-100 ${style.registerOptions}`}
              >
                {!showAuthModal && (
                  <>
                    <h3>Sei già registrato?</h3>
                    <p
                      onClick={() => {
                        setShowAuthModal(true);
                      }}
                      className="text-warning"
                      style={{ cursor: "pointer" }}
                    >
                      Accedi ora!
                    </p>
                  </>
                )}
                {showAuthModal && (
                  <>
                    <h3 className="mb-3">Accedi</h3>
                    <input
                      value={username}
                      className={`mb-5 mb-md-3 ${style.inputOptions}`}
                      type="text"
                      placeholder="username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <input
                      value={password}
                      className={`mb-5 mb-md-3 ${style.inputOptions}`}
                      type="password"
                      placeholder="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
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
                        marginTop: "12px",
                      }}
                    />
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* {showAuthModal && (
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
        </Modal>
      )} */}
    </>
  );
};

export default Login;
