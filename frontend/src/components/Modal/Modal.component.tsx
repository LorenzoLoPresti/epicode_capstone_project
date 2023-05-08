import styles from "./Modal.module.css";
import Overlay from "../Overlay/Overlay.component";

const Modal = ({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}) => {
  return (
    <>
      <Overlay
        onClick={onClose}
        // style={{ backgroundColor: "white", opacity: "1" }}
      />
      {title && <h1>{title}</h1>}
      <div className={`${styles.modal}`}>{children}</div>
    </>
  );
};

Modal.Body = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

Modal.Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Modal;
