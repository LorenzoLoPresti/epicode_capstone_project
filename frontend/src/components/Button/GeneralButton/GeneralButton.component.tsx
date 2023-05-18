import styles from "./GeneralButton.module.css";

const GeneralButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick} className={`px-3 py-2 ${styles.btn}`}>
      {text}
    </button>
  );
};

export default GeneralButton;
