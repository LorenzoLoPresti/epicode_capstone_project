import styles from "./Overlay.module.css";

interface OverlayProps {
  onClick?: () => void;
  style?: Record<string, string | number>;
}

const Overlay = ({ onClick, style }: OverlayProps) => {
  return (
    <div
      className={`${styles.Overlay}`}
      onClick={onClick}
      style={{ ...style }}
    />
  );
};

export default Overlay;
