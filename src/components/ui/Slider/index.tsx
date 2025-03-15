import styles from "./Slider.module.scss";
import Button from "@components/ui/Button";

interface SliderProps {
  data: genresItem[];
}

interface genresItem {
  name: string;
  id: number;
}

const Slider = ({ data }: SliderProps) => {
  return (
    <div className={styles.slider}>
      {data.map((item: genresItem) => (
        <Button name={item.name} key={item.id} />
      ))}
    </div>
  );
};

export default Slider;
