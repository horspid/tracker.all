import styles from "./CategoryPage.module.scss";
import { useParams } from "react-router";
import CategoryICO from "@assets/images/icons/category.svg?react";
import { useCallback, useEffect, useState } from "react";
import { options } from "@config/config.ts";
import { cardPreview } from "@interfaces/movies.ts";
import ProductCard from "@components/ui/ProductCard";

interface MovieResponse {
  docs: cardPreview[];
}

const CategoryPage = () => {
  const { name } = useParams<string>();

  const [data, setData] = useState<cardPreview[]>();

  const fetchCategories = useCallback(async () => {
    try {
      const url = new URL(
        `https://api.kinopoisk.dev/v1.4/movie?type=${name}&limit=20&sortField=votes.kp&sortType=-1`,
      );

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data: MovieResponse = await response.json();
      setData(data.docs);
      return data.docs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, [name]);

  useEffect(() => {
    fetchCategories();
  }, [name]);

  return (
    <section className={styles.category}>
      <div className={styles.category__content}>
        <div className={styles.category__entry}>
          <CategoryICO className={styles.ico__category} />
          <h1 className={styles.category__title}>
            Categories:{" "}
            <span>{name && name[0].toUpperCase() + name.slice(1)}</span>
          </h1>
        </div>
      </div>
      <div className={styles.category__items}>
        {data && data.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>
    </section>
  );
};

export default CategoryPage;
