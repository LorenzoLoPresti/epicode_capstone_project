import { Col, Container, Row } from "react-bootstrap";
import styles from "./Menu.module.css";
import { Ristorante } from "../../pages/Home/Home.types";
import { Link } from "react-router-dom";
import GeneralButton from "../Button/GeneralButton/GeneralButton.component";

const Menu = ({
  onClick,
  showMenu,
  ristoranteEl,
}: {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  ristoranteEl: Ristorante;
}) => {
  return (
    <>
      {ristoranteEl && (
        <>
          <div
            className={`d-flex justify-content-center ${
              showMenu && styles.menuMainOptions
            }
        `}
            // ${!showMenu && styles.menuSrollup}
          >
            <Container
              className={`bg-light position-relative ${styles.menuContainer} `}
            >
              <div className={`position-absolute ${styles.decorator}`}></div>
              <Row
                className="d-flex flex-column justify-content-center"
                style={{ height: "100%", padding: "3rem 5% 5rem 8%" }}
              >
                <Col
                  className={`mt-5 d-flex align-items-center justify-content-end ${styles.menuTitleContainer}`}
                >
                  <h2 className={`${styles.menuTitle} pb-5 position-absolute`}>
                    {ristoranteEl?.name}{" "}
                    <span className="ms-3 fs-3" onClick={() => onClick(false)}>
                      X
                    </span>
                  </h2>
                </Col>
                <Col className="d-flex">
                  <div className={`${styles.imgContainer}`}>
                    <img
                      className={`${styles.menuImg}`}
                      src={ristoranteEl?.menu_img}
                      alt="immagine-menu"
                    />
                  </div>
                  <div className={`${styles.descContainer} ps-3`}>
                    <p>{ristoranteEl?.descrizione}</p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolorum fugiat magnam sapiente! Deleniti sapiente aliquid
                      placeat rerum doloremque? Amet laudantium nulla veniam
                      officiis dolore adipisci vel ullam itaque aut ad.
                    </p>
                    <div className="w-100 text-end pe-3">
                      <Link
                        style={{ textDecoration: "none", color: "#faf4f0" }}
                        to={`/store/${ristoranteEl?.name}`}
                        onClick={() => console.log(ristoranteEl?.name)}
                      >
                        <GeneralButton text="Vai agli chef" />
                      </Link>
                    </div>
                    <div className={`${styles.decoratorDesc}`}></div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
