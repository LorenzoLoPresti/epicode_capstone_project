import { Carousel } from "react-bootstrap";
import styles from "./MyCarousel.module.css";
import { Ristorante } from "../../pages/Home/Home.types";
import { useState } from "react";
import Menu from "../Menu/Menu.component";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { darkNav } from "../../redux/reducers/navbarStore";
import { useEffect } from "react";

const MyCarousel = ({ array }: { array: Ristorante[] }) => {
  const navbarColorDark = useAppSelector((state) => state.navbarReducer?.dark);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (navbarColorDark) dispatch(darkNav(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={`position-relative ${styles.carouselContainerOptions}`}>
        <Carousel>
          {array.length > 0 &&
            array.map((e, i) => (
              <Carousel.Item interval={100000000} key={"carouselId:" + i}>
                <div
                  className={`d-block w-100 position-relative`}
                  style={{
                    backgroundImage: `url(${e?.immagine})`,
                    height: "100vh",
                    backgroundSize: "cover",
                    filter: "greyscale(100%)",
                  }}
                >
                  <div
                    className={`${styles.imgFilter} ${
                      navbarColorDark && styles.menuOpenFilter
                    }`}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {!showMenu && (
                      <div
                        className={`position-absolute ps-4 ${styles.descriptionContainer}`}
                      >
                        {/* <div className={`py-3 ${styles.descriptionMargin}`}> */}
                        <p className={`${styles.descriptionOptions} mb-0`}>
                          {e?.descrizione}
                        </p>
                        {/* </div> */}
                      </div>
                    )}
                    {!showMenu && (
                      <div className={styles.titleContainer}>
                        <h1
                          className={`${styles.titleOptions}  mb-0`}
                          onClick={() => {
                            setShowMenu(true);
                            dispatch(darkNav(true));
                          }}
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
                    )}
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
