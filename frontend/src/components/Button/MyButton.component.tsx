import { Nav } from "react-bootstrap";
import styles from "./Button.module.css";
import { ButtonProps } from "./ByButton.types";

const MyButton = ({ text, onClickFnc, style }: ButtonProps) => {
  return (
    <button
      className={`px-3 py-2 ${styles.btn}`}
      onClick={onClickFnc}
      style={{ ...style }}
    >
      <Nav.Link>{text}</Nav.Link>
    </button>
  );
};

export default MyButton;
