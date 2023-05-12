import styles from "./Modal.module.css";
import Overlay from "../Overlay/Overlay.component";
import { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";

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
      <div className={`${styles.modal}`}>
        <Row className="d-flex">
          <Col md={6} className="p-0 d-none d-md-block">
            {/* <Modal.Body> */}
            <div
              className="d-flex flex-column p-5 text-light"
              style={{
                backgroundImage: `url("https://static1.bigstockphoto.com/4/8/2/large1500/284139886.jpg")`,
                backgroundSize: "cover",
                maxWidth: "530px",
                height: "480px",
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
          </Col>
          <Col xs={12} md={6} className={`pe-3 ${styles.bgModal}`}>
            {/* <Modal.Footer> */}
            <div className="position-relative">
              <span className={`${styles.closeModal}`} onClick={onClose}>
                <RxCross1 />
              </span>
            </div>
            <div className={`d-flex flex-column align-items-center py-5`}>
              <h2 className="fs-3 pt-3 fw-bold">{title || "ciao"} </h2>
              <p className="mb-5 mb-md-2">{subtitle || "ciao"}</p>
              <div className="d-flex flex-column align-items-center px-0 p-md-2 w-100">
                <input
                  value={username}
                  className={`mb-5 mb-md-3 ${styles.inputOptions}`}
                  type="text"
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  value={password}
                  className={`mb-5 mb-md-3 ${styles.inputOptions}`}
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {children}
              </div>
            </div>
          </Col>
        </Row>
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
