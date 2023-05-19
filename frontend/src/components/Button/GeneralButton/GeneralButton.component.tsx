import styles from "./GeneralButton.module.css";

const GeneralButton = ({
  text,
  onClick,
  style,
}: {
  text: string;
  onClick?: () => void;
  style?: Record<string, string | number>;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 ${styles.btn}`}
      style={{ ...style }}
    >
      {text}
    </button>
  );
};

export default GeneralButton;
