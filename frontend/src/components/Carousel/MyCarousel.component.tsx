import { Carousel } from "react-bootstrap";
import styles from "./MyCarousel.module.css";
// import { Ristorante } from "../../pages/Home/Home.types";

const MyCarousel = ({ images }: { images: string[] }) => {
  return (
    <Carousel>
      {images.length > 0 &&
        images?.map((img) => (
          <Carousel.Item interval={100000000}>
            <div
              className="d-block w-100"
              style={{
                backgroundImage: `url(${img})`,
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
                <h1 className="text-light">La Pergola</h1>
              </div>
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default MyCarousel;
