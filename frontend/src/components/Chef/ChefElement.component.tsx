import { Chef } from "../../pages/Home/Home.types";
import styles from "./ChefElement.module.css";

const ChefElement = ({
  chef,
  selected,
  setSelected,
}: {
  chef: Chef;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <div
        onClick={() => setSelected(chef?.id)}
        className={`${styles.colChefOptions}  ${
          selected === chef?.id ? styles.chefSelected : ""
        } `}
      >
        <div
          className={`${styles.chefContainer} text-center`}
          style={{
            backgroundImage: `url(https://static1.moviewebimages.com/wordpress/wp-content/uploads/2022/04/IMG_604.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={`${!selected && styles.divOverlay} mb-3`}></div>
        </div>
      </div>
      <h4 className="mb-5">{chef?.name}</h4>
    </>
  );
};

export default ChefElement;
