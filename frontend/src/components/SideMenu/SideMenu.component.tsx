import Overlay from "../Overlay/Overlay.component";
import styles from "./SideMenu.module.css";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface sideMenu {
  children?: React.ReactNode;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  flex?: boolean;
  directionColumn?: boolean;
}

interface sideMenuCommand {
  text: string;
  onClick?: () => void;
}

const SideMenu = ({
  children,
  setShowMenu,
  flex,
  directionColumn,
}: sideMenu) => {
  const [flexbox] = useState(flex || false);
  const [flexColumn] = useState(directionColumn || false);
  const [shown, setShown] = useState(true);

  const handleMenu = () => {
    setShown(false);
    setTimeout(() => {
      setShowMenu(false);
    }, 400);
  };

  return (
    <>
      <Overlay onClick={handleMenu} transparent={true} />
      <div className={`${styles.sideMenu} ${!shown && styles.close}`}>
        <div
          className={`py-5 px-4 position-relative ${flexbox && "d-flex"} ${
            flexColumn && "flex-column"
          }`}
        >
          {children}
          <span className={`${styles.closeModal}`} onClick={handleMenu}>
            <RxCross1 className="text-light" />
          </span>
        </div>
      </div>
    </>
  );
};

SideMenu.Headline = ({ text }: { text: string }) => {
  return <p className={`fs-2 fw-bold ${styles.headline}`}>{text}</p>;
};

SideMenu.Command = ({ text, onClick }: sideMenuCommand) => {
  return (
    <p className={`fs-4  fw-bold ${styles.menuOption}`} onClick={onClick}>
      {text}
    </p>
  );
};

SideMenu.Option = ({ text }: { text: string }) => {
  return <p className={`fs-4 fw-bold ${styles.menuOption}`}>{text}</p>;
};

export default SideMenu;
