import styles from "./Input.module.scss";
import { FunctionComponent, SVGProps } from "react";

interface InputProps {
  className?: string;
  placeholder?: string;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  type?: string;
  value?: string;
}

const Input = ({ Icon, placeholder, type, value, className }: InputProps) => {
  return (
    <div className={styles.input}>
      <input
        type={type}
        className={className || styles.input__field}
        placeholder={placeholder}
        value={value}
      />
      {Icon && <Icon className={styles.input__img} />}
    </div>
  );
};

export default Input;
