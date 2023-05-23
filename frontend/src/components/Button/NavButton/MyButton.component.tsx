import { Nav } from "react-bootstrap";
import styles from "./Button.module.css";
import { ButtonProps } from "./ByButton.types";
import { CiLogin } from "react-icons/ci";

const MyButton = ({ text, onClick, style, icon }: ButtonProps) => {
  return (
    <button
      className={`px-3 py-2 ${styles.btn}`}
      onClick={onClick}
      style={{ ...style }}
    >
      <Nav.Link>
        {icon && <CiLogin className="me-2" />}
        {text}
      </Nav.Link>
    </button>
  );
};

export default MyButton;
