import styles from "./Overlay.module.css";

interface OverlayProps {
  onClick?: () => void;
  style?: Record<string, string | number>;
  transparent?: boolean;
}

// OVERLAY CHE COMPARE ALL'APERTURA DI UN MODALE O DEL MENU LATERALE
const Overlay = ({ onClick, style, transparent }: OverlayProps) => {
  return (
    <div
      className={`${styles.Overlay} ${transparent && "bg-transparent"}`}
      onClick={onClick}
      style={{ ...style }}
    />
  );
};

export default Overlay;
