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
                className="d-flex flex-column pt-5 justify-content-center"
                style={{ height: "100%" }}
              >
                <Col className="mt-5 d-flex align-items-center">
                  <h2 className={`${styles.menuTitle}`}>
                    {ristoranteEl?.name}
                  </h2>
                </Col>
                <Col>
                  <h3 onClick={() => onClick(false)}>{ristoranteEl?.name}</h3>
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
