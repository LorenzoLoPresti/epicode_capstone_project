import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import styles from "./Shop.module.css";

const Shop = () => {
  const ristorante = useAppSelector((state) => state.authToken?.ristoranti);
  const { nomeRistorante } = useParams();

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${ristorante
            .filter((e) => e.name === nomeRistorante)
            .map((e) => e.immagine)})`,
          height: "100vh",
          width: "100vw",
          backgroundSize: "cover",
        }}
      >
        <div className={`${styles.mainContainer}`}>Carrello</div>
      </div>
    </>
  );
};

export default Shop;
