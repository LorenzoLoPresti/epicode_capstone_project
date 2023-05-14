import { Carousel } from "react-bootstrap";
import styles from "./MyCarousel.module.css";
import { Ristorante } from "../../pages/Home/Home.types";

const MyCarousel = ({ array }: { array: Ristorante[] }) => {
  return (
    <Carousel>
      {array.length > 0 &&
        array.map((e, i) => (
          <Carousel.Item interval={100000000} key={"carouselId:" + i}>
            <div
              className="d-block w-100"
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
                <h1 className={`text-light fs1 ${styles.titleOptions}`}>
                  {e?.name}
                </h1>
              </div>
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default MyCarousel;
