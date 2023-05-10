import styles from "./Modal.module.css";
import Overlay from "../Overlay/Overlay.component";
import { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";

const Modal = ({
  children,
  onClose,
  title,
  subtitle,
  username,
  setUsername,
  password,
  setPassword,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <Overlay
        onClick={onClose}
        // style={{ backgroundColor: "white", opacity: "1" }}
      />
      {title && <h1>{title}</h1>}
      <div className={`${styles.modal}`}>
        {" "}
        <Row className="d-flex">
          <Col xs={6} className="p-0">
            {/* <Modal.Body> */}
            <div
              className="d-flex flex-column p-5 text-light"
              style={{
                backgroundImage: `url("https://static1.bigstockphoto.com/4/8/2/large1500/284139886.jpg")`,
                backgroundSize: "cover",
                width: "530px",
                height: "570px",
              }}
            >
              <h2
                className="m-0"
                style={{
                  fontSize: "3rem",
                  fontFamily: "'Abril Fatface', cursive",
                }}
              >
                Gourmet
              </h2>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: "100",
                }}
              >
                a casa tua
              </h3>
            </div>
            {/* </Modal.Body> */}
          </Col>
          <Col xs={6} className="pe-3">
            {/* <Modal.Footer> */}
            <div className="d-flex flex-column align-items-center py-5">
              <h2 className="fs-3 pt-3 fw-bold">{title || "ciao"}</h2>
              <p className="mb-5">{subtitle || "ciao"}</p>
              <div className="d-flex flex-column px-5">
                <input
                  value={username}
                  className="mb-3"
                  type="text"
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  value={password}
                  className="mb-5"
                  type="text"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {children}
              </div>
            </div>
            {/* </Modal.Footer> */}
          </Col>
        </Row>
        {/* <Modal.Body>Ciao</Modal.Body>
            <Modal.Footer>Capra</Modal.Footer> */}
      </div>
    </>
  );
};

Modal.Body = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

Modal.Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Modal;
