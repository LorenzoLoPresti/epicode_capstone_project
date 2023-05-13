import styles from "./Overlay.module.css";

interface OverlayProps {
  onClick?: () => void;
  style?: Record<string, string | number>;
  transparent?: boolean;
}

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
