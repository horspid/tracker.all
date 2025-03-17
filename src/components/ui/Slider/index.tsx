import { Genre } from "@interfaces/movies";
import styles from "./Slider.module.scss";
import Button from "@components/ui/Button";

interface SliderProps {
  data: Genre[];
}

const Slider = ({ data }: SliderProps) => {
  return (
    <div className={styles.slider}>
      {data.map((item: Genre, index) => (
        <Button name={item.name} key={index} />
      ))}
    </div>
  );
};

export default Slider;
