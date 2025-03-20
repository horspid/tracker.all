import styles from "./Category.module.scss";

interface categoryCardProps {
  data: { name: string; src: string };
}

const CategoryCard = ({ data }: categoryCardProps) => {
  return (
    <article className={styles.category}>
      <img src={data.src} alt="" className={styles.category__img} />
      <h2 className={styles.category__title}>
        {data.name[0].toUpperCase() + data.name.slice(1)}
      </h2>
    </article>
  );
};

export default CategoryCard;
