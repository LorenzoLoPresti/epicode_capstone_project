import { Col, Container, Row } from "react-bootstrap";
import styles from "./Menu.module.css";
import { Ristorante } from "../../pages/Home/Home.types";

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
            <Container className={`bg-light ${styles.menuContainer}`}>
              <Row
                className="d-flex flex-column justify-content-center"
                style={{ height: "100%", padding: "3rem 5% 5rem 8%" }}
              >
                <Col
                  className={`mt-5 d-flex align-items-center ${styles.menuTitleContainer}`}
                >
                  <h2 className={`${styles.menuTitle} pb-5`}>
                    {ristoranteEl?.name}
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
                  <div className={`${styles.descContainer}`}>
                    <p>{ristoranteEl?.descrizione}</p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolorum fugiat magnam sapiente! Deleniti sapiente aliquid
                      placeat rerum doloremque? Amet laudantium nulla veniam
                      officiis dolore adipisci vel ullam itaque aut ad.
                    </p>
                    <div className="w-100 text-end pe-3">
                      <button
                        className={`px-3 py-2 ${styles.btn}`}
                        onClick={() => onClick(false)}
                      >
                        Vai agli chef
                      </button>
                    </div>
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
