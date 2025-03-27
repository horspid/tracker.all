import styles from "./Input.module.scss";
import { ChangeEventHandler, FunctionComponent, SVGProps } from "react";

interface InputProps {
  className?: string;
  placeholder?: string;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  type?: string;
  name?: string
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ Icon, placeholder, type, value, className, name, onChange}: InputProps) => {
  return (
    <div className={styles.input}>
      <input
        type={type}
        className={className || styles.input__field}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {Icon && <Icon className={styles.input__img} />}
    </div>
  );
};

export default Input;
