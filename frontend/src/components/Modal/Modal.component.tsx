import styles from "./Modal.module.css";
import Overlay from "../Overlay/Overlay.component";
import { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import sfondoModale from "../../assets/sfondoModale.jpg";

const Modal = ({
  children,
  onClose,
  title,
  subtitle,
  username,
  setUsername,
  password,
  setPassword,
  warning,
  pswWarning,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  warning?: boolean;
  pswWarning?: boolean;
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
                backgroundImage: `url(${sfondoModale})`,
                backgroundSize: "cover",
                width: "100%",
                height: "100%",
                minHeight: "480px",
                borderTopLeftRadius: "0.375rem",
                borderBottomLeftRadius: "0.375rem",
              }}
            ></div>
          </Col>
          <Col xs={12} md={6} className={` ${styles.bgModal}`}>
            {/* <Modal.Footer> */}
            <div className={`${styles.imgFilter}`}>
              <div className="position-relative">
                <div className={`${styles.closeModal}`} onClick={onClose}>
                  <RxCross1 />
                </div>
              </div>
              <div className={`d-flex flex-column align-items-center py-5`}>
                <h2 className={`fs-3 pt-3 ${styles.titleOptions}`}>
                  {title || "ciao"}
                </h2>
                <p className={`mb-5 mb-md-2 ${styles.titleOptions}`}>
                  {subtitle || "ciao"}
                </p>
                <div className="d-flex flex-column align-items-center px-0 p-md-2 w-100">
                  <input
                    value={username}
                    className={`mb-5 mb-md-3 ${styles.inputOptions} ${
                      warning && "bg-warning"
                    }`}
                    type="text"
                    placeholder="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <input
                    value={password}
                    className={`mb-5 mb-md-3 ${styles.inputOptions} ${
                      pswWarning && "bg-warning"
                    }`}
                    type="password"
                    placeholder="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {children}
                </div>
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
