import { Card } from "react-bootstrap";

import styles from "./MyCard.module.css";
import COLORS from "../../style/color";

const MyCard = ({
  children,
  text,
  desc,
}: {
  children: React.ReactNode;
  text: string;
  desc: string;
}) => {
  return (
    <Card
      style={{ backgroundColor: COLORS.brandBlack }}
      className={`mb-5 ${styles.cardContainer}`}
    >
      <Card.Body className="px-5 py-4 p-md-3 p-lg-5">
        <div className="d-flex justify-content-center">
          <div
            className={`${styles.icon} mb-4`}
            style={{ backgroundColor: COLORS.brandGold }}
          >
            {children}
          </div>
        </div>
        <Card.Title
          style={{ color: COLORS.brandGold }}
          className="text-center mb-3"
        >
          {text}
        </Card.Title>
        <Card.Text style={{ color: COLORS.brandWhite }} className="text-center">
          {desc}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
