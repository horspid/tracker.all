import styles from "./CategoryPage.module.scss";
import { useParams } from "react-router";
import CategoryICO from "@assets/images/icons/category.svg?react";
import { useCallback, useEffect, useState } from "react";
import { options } from "@config/config.ts";
import { cardPreview } from "@interfaces/movies.ts";
import ProductCard from "@components/ui/ProductCard";
import Search from "@components/ui/Search";
import { useDebouncedCallback } from "use-debounce";
import SkeletonCard from "@components/ui/SkeletonCard";

interface MovieResponse {
  docs: cardPreview[];
}

const CategoryPage = () => {
  const { name } = useParams<string>();

  const [data, setData] = useState<cardPreview[]>();
  const [parsedName, setParsedName] = useState(name);
  const [inputValue, setInputValue] = useState("");
  const nameUrl = name && name.replace("-", " ");

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

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateRequestAPI();
  };

  const updateRequestAPI = useDebouncedCallback(async () => {
    try {
      if (!inputValue.trim()) {
        fetchCategories();
        return;
      }
      const url = new URL(
        `https://api.kinopoisk.dev/v1.4/movie/search?type=${name}&limit=20&query=${inputValue}`,
      );

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data: MovieResponse = await response.json();

      const result = data.docs.filter((movie) => movie.type === name);

      setData(result);
      return data.docs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, 250);

  useEffect(() => {
    fetchCategories();
    setParsedName(nameUrl);
  }, [name]);

  return (
    <section className={styles.category}>
      <div className={styles.category__heading}>
        <div className={styles.category__entry}>
          <CategoryICO className={styles.ico__category} />
          <h1 className={styles.category__title}>
            Categories:{" "}
            <span>
              {parsedName && parsedName[0].toUpperCase() + parsedName.slice(1)}
            </span>
          </h1>
        </div>
        <form className={styles.category__search}>
          <Search
            name={"Search in category..."}
            onChange={onChangeHandler}
            value={inputValue}
          />
        </form>
      </div>
      <div className={styles.category__items}>
        {!data && <SkeletonCard listToRender={10} />}
        {data && data.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>
    </section>
  );
};

export default CategoryPage;
