import { Carousel } from "react-bootstrap";
import styles from "./MyCarousel.module.css";
import { Ristorante } from "../../pages/Home/Home.types";
import { useState } from "react";
import Menu from "../Menu/Menu.component";

const MyCarousel = ({ array }: { array: Ristorante[] }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className={`position-relative ${styles.carouselContainerOptions}`}>
        <Carousel>
          {array.length > 0 &&
            array.map((e, i) => (
              <Carousel.Item interval={100000000} key={"carouselId:" + i}>
                <div
                  className="d-block w-100 position-relative"
                  style={{
                    backgroundImage: `url(${e?.immagine})`,
                    height: "100vh",
                    backgroundSize: "cover",
                  }}
                >
                  <div
                    className={`${styles.imgFilter}`}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <div
                      className={`position-absolute ps-4 ${styles.descriptionContainer}`}
                    >
                      {/* <div className={`py-3 ${styles.descriptionMargin}`}> */}
                      <p className={`${styles.descriptionOptions} mb-0`}>
                        {e?.descrizione}
                      </p>
                      {/* </div> */}
                    </div>
                    <div>
                      <h1
                        className={`${styles.titleOptions}  mb-0`}
                        onClick={() => setShowMenu(true)}
                      >
                        {e?.name}
                      </h1>
                      <p className={`${styles.subtitleOptions}`}>
                        {e?.citta}
                        <span className="me-3 ms-3">/</span>
                        <span className={`${styles.subtitleOptions}`}>
                          {e?.indirizzo}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                {showMenu && (
                  <Menu
                    onClick={setShowMenu}
                    showMenu={showMenu}
                    ristoranteEl={e}
                  />
                )}
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default MyCarousel;
