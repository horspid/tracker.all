import styles from "./Category.module.scss";
import { useNavigate } from "react-router";

interface categoryCardProps {
  data: { name: string; src: string; nameUrl: string };
}

const CategoryCard = ({ data }: categoryCardProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/categories/${data.nameUrl}`);
  };

  return (
    <article className={styles.category} onClick={onClickHandler}>
      <img src={data.src} alt="" className={styles.category__img} />
      <h2 className={styles.category__title}>
        {data.name[0].toUpperCase() + data.name.slice(1)}
      </h2>
    </article>
  );
};

export default CategoryCard;
