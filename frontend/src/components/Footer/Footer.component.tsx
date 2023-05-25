// import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { RiArrowDropRightLine } from "react-icons/ri";
import COLORS from "../../style/color";
import { BsInstagram } from "react-icons/bs";
import { CiFacebook } from "react-icons/ci";
import { ImPinterest2 } from "react-icons/im";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Container className="pt-5 pb-4">
        <Row className="justify-content-between">
          <Col xs={12} md={6} lg={7} className="mb-3">
            <div className="ps-2">
              <h4 style={{ color: COLORS.brandGold }}>
                GrandBistrot Homecooking
              </h4>
            </div>
            <ul className="p-0">
              <li>
                <div className="d-flex align-items-center">
                  <RiArrowDropRightLine className={`fs-2 ${styles.icons}`} />
                  <p className={`${styles.paragraphOptions} mb-0`}>
                    <Link to={"/login"} className={`${styles.linkOptions}`}>
                      Accedi
                    </Link>
                  </p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <RiArrowDropRightLine className={`fs-2 ${styles.icons}`} />
                  <p className={`${styles.paragraphOptions} mb-0`}>
                    <Link to={"/contatti"} className={`${styles.linkOptions}`}>
                      Contatti
                    </Link>
                  </p>
                </div>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={5}>
            <Row>
              <Col xs={12} lg={6} className="mb-3">
                <div className="ps-2">
                  <h4 style={{ color: COLORS.brandGold }}>Legal</h4>
                </div>

                <ul className="p-0">
                  <li>
                    <div className="d-flex align-items-center">
                      <RiArrowDropRightLine
                        className={`fs-2 ${styles.icons}`}
                      />
                      <p className={`${styles.paragraphOptions} mb-0`}>
                        <Link
                          to={"/contatti"}
                          className={`${styles.linkOptions}`}
                        >
                          Contatti
                        </Link>
                      </p>
                    </div>
                  </li>
                </ul>
              </Col>
              <Col xs={12} lg={6} className="ps-4 mb-3">
                <div>
                  <h4 style={{ color: COLORS.brandGold }}>Social</h4>
                </div>
                <div className="d-flex pt-2">
                  <div className={`me-2 ${styles.socialBox}`}>
                    <Link
                      to={"https://www.instagram.com/"}
                      target="_blank"
                      className={`${styles.socialIcon} fs-4`}
                    >
                      <BsInstagram />
                    </Link>
                  </div>
                  <div className={`me-2 ${styles.socialBox}`}>
                    <Link
                      to={"https://www.facebook.com/"}
                      target="_blank"
                      className={`${styles.socialIcon} fs-3`}
                    >
                      <CiFacebook />
                    </Link>
                  </div>
                  <div className={` ${styles.socialBox}`}>
                    <Link
                      to={"https://www.pinterest.com/"}
                      target="_blank"
                      className={`${styles.socialIcon} fs-4`}
                    >
                      <ImPinterest2 />
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="w-100 text-center p-4">
        <p style={{ color: COLORS.brandGold }} className="mb-0">
          © 2023 GrandBistrot Homecooking. Tutti i diritti sono riservati.
        </p>
      </div>
    </div>
  );
};

export default Footer;
