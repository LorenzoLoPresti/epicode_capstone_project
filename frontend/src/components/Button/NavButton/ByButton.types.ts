export interface ButtonProps {
  text: string;
  icon?: boolean;
  onClick: () => void;
  style?: Record<string, string | number>;
}
