import styles from "./Button.module.scss";

interface ButtonProps {
  name: string;
}

const Button = ({ name }: ButtonProps) => {
  return (
    <button disabled className={styles.button}>
      {name}
    </button>
  );
};

export default Button;
