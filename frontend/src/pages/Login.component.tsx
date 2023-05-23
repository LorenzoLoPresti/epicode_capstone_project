import { useState, useEffect } from "react";
// import Modal from "../components/Modal/Modal.component";
import MyButton from "../components/Button/NavButton/MyButton.component";
import COLORS from "../style/color";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { fetchToken, user } from "../redux/reducers/tokenStore";
import { Col, Container, Row } from "react-bootstrap";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import accedi from "../assets/accediImg.jpg";

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
          backgroundImage: `url(${accedi})`,
          backgroundSize: "cover",
        }}
      >
        <div className={`${style.loginContainerOptions}`}>
          <Container className="w-100 h-100 py-5 p-md-5">
            <Row className="d-flex justify-content-center align-items-center text-light h-100 py-5 px-3 p-md-5">
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
                      style={{ cursor: "pointer", color: COLORS.brandGold }}
                    >
                      Accedi ora!
                    </p>
                  </>
                )}
                {showAuthModal && (
                  <>
                    <h3 className="mb-3" style={{ color: COLORS.brandGold }}>
                      Accedi
                    </h3>
                    <form
                      onClick={(e) => e.preventDefault()}
                      className="d-flex flex-column align-items-center px-3 px-md-5 pb-md-2 w-100"
                    >
                      <div className={style.inputBox}>
                        <input
                          value={username}
                          className={`mb-5 mb-md-3 ${style.inputOptions}`}
                          type="text"
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                        <label className={style.label}>Username</label>
                      </div>
                      <div className={style.inputBox}>
                        <input
                          value={password}
                          className={`mb-5 mb-md-3 ${style.inputOptions}`}
                          type="password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <label className={style.label}>Username</label>
                      </div>
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
                    </form>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Login;