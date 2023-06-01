import { useState } from "react";
import { Chef } from "../../pages/Home/Home.types";
import styles from "./ChefElement.module.css";
import { useAppDispatch } from "../../redux/store/store";
import { removeChefToCart } from "../../redux/reducers/carrelloStore";
import COLORS from "../../style/color";

const ChefElement = ({
  chef,
  selected,
  setSelected,
}: // setMenuSelected,
{
  chef: Chef;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  // setMenuSelected: React.Dispatch<
  //   React.SetStateAction<number | null | undefined>
  // >;
}) => {
  const dispatch = useAppDispatch();
  const [nameVisible, setNameVisible] = useState(false);

  // SELEZIONO L'ELEMENTO SPECIFICO
  const selectChef = () =>
    selected !== chef?.id ? setSelected(chef?.id) : setSelected(0);

  const showName = () => {
    if (selected !== chef?.id) setNameVisible(true);
  };

  const hideName = () => setNameVisible(false);

  return (
    <>
      <div
        onClick={() => {
          selectChef();
          dispatch(removeChefToCart());
          // selectMenu();
        }}
        className={`${styles.colChefOptions}`}
      >
        <div
          className={`${styles.chefContainer} ${
            selected === chef?.id ? styles.colorImg : styles.greyScale
          } text-center mb-5`}
          style={{
            backgroundImage: `url(${chef?.immagineProfilo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            onMouseEnter={showName}
            onMouseLeave={hideName}
            className={`${selected !== chef?.id && styles.divOverlay} ${
              styles.divOverlayDimensions
            } ${
              selected === chef?.id && styles.chefSelected
            } d-flex justify-content-center align-items-center mb-3`}
          >
            <h4
              className={`${styles.chefName} ${
                nameVisible && styles.chefNameVisible
              } ${selected === chef?.id && styles.chefSelected}`}
            >
              {chef?.name}
            </h4>
          </div>
          {selected === chef?.id && (
            <div className="text-start">
              <p
                className={styles.linkAnimation}
                style={{ color: COLORS.brandGold }}
              >
                Clicca sull'immagine o su questo link per selezionare un altro
                chef
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChefElement;
