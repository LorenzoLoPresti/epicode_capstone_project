import styles from "./Menu.module.css";

const Menu = ({
  onClick,
}: //   showMenu,
{
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  //   showMenu: boolean;
}) => {
  return (
    <>
      <div
        className={`bg-light ${styles.menuMainContainer}`}
        onClick={() => onClick(false)}
      >
        Menu<h3>X</h3>
      </div>
      ;
    </>
  );
};

export default Menu;
