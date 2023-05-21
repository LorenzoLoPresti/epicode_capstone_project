import Overlay from "../Overlay/Overlay.component";
import styles from "./SideMenu.module.css";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface sideMenu {
  children?: React.ReactNode;
  onClose: () => void;
  flex?: boolean;
  directionColumn?: boolean;
}

interface sideMenuCommand {
  text: string;
  onClick?: () => void;
}

const SideMenu = ({ children, onClose, flex, directionColumn }: sideMenu) => {
  const [flexbox] = useState(flex || false);
  const [flexColumn] = useState(directionColumn || false);
  return (
    <>
      <Overlay onClick={onClose} transparent={true} />
      <div className={`${styles.sideMenu}`}>
        <div
          className={`py-5 px-4 position-relative ${flexbox && "d-flex"} ${
            flexColumn && "flex-column"
          }`}
        >
          {children}
          <span className={`${styles.closeModal}`} onClick={onClose}>
            <RxCross1 className="text-light" />
          </span>
        </div>
      </div>
      ;
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
