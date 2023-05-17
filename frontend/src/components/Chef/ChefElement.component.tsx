import { useState } from "react";
import { Chef } from "../../pages/Home/Home.types";
import styles from "./ChefElement.module.css";

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
  const [nameVisible, setNameVisible] = useState(false);

  const selectChef = () =>
    selected !== chef?.id ? setSelected(chef?.id) : setSelected(0);

  // const selectMenu = () => {
  //   selected === chef?.id && setMenuSelected(chef.listaMenu[0].id);
  // };

  const showName = () => {
    if (selected !== chef?.id) setNameVisible(true);
  };

  const hideName = () => setNameVisible(false);

  return (
    <>
      <div
        onClick={() => {
          selectChef();
          // selectMenu();
        }}
        className={`${styles.colChefOptions}`}
      >
        <div
          className={`${styles.chefContainer} ${
            selected === chef?.id ? styles.colorImg : styles.greyScale
          } text-center`}
          style={{
            backgroundImage: `url(https://static1.moviewebimages.com/wordpress/wp-content/uploads/2022/04/IMG_604.jpeg)`,
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
        </div>
      </div>
    </>
  );
};

export default ChefElement;
