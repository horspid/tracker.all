import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./MovieTabs.module.scss";
import { Movie, MovieInfo } from "@interfaces/movies.ts";
import Slider from "@components/ui/Slider";
import ProductCard from "@components/ui/ProductCard";
import { options } from "@config/config.ts";
import { useState } from "react";

interface MovieTabsProps {
  data: MovieInfo;
}

interface MovieTabsState {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Movie[];
}

const MovieTabs = ({ data }: MovieTabsProps) => {
  const [collection, setCollection] = useState<MovieTabsState | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const fetchCollection = async (id: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/collection/${id}`,
        options,
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const collection = await response.json();
      setCollection(collection);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(collection);

  return (
    <Tabs className={styles.tabs} selectedTabClassName={styles.tabs__active}>
      <TabList className={styles.tabs__container}>
        <Tab className={styles.tabs__heading}>Description</Tab>
        <Tab className={styles.tabs__heading}>About</Tab>
        <Tab
          className={styles.tabs__heading}
          onClick={() => fetchCollection(data.belongs_to_collection.id)}
        >
          Related
        </Tab>
        <Tab className={styles.tabs__heading}>Similar</Tab>
      </TabList>

      <TabPanel selectedClassName={styles.tabs__panel}>
        <p>Country: {data.origin_country}</p>
        <p>Release Date: {formatDate(data.release_date)}</p>
        <div className={styles.tabs__panel_slider}>
          Genres: <Slider data={data.genres} />
        </div>
        <p className={styles.tabs__panel_description}>{data.overview}</p>
      </TabPanel>
      <TabPanel selectedClassName={styles.tabs__panel}>
        <p>Country: {data.origin_country}</p>
        <p>Release Date: {formatDate(data.release_date)}</p>
        <div className={styles.tabs__panel_slider}>
          Genres: <Slider data={data.genres} />
        </div>
        <p>Status: {data.status}</p>
        <p>Language: {data.original_language}</p>
        <p>
          Budget:{" "}
          {data.budget === 0
            ? "Budget information not available."
            : `$${data.budget}`}
        </p>{" "}
        <p>
          Revenue:{" "}
          {data.revenue === 0
            ? "Revenue information not available."
            : `$${data.revenue}`}
        </p>
      </TabPanel>
      <TabPanel
        selectedClassName={styles.tabs__panel}
        className={styles.tabs__panel_related}
      >
        {collection ? (
          collection.parts.map((item) => (
            <ProductCard movie={item} key={item.id} />
          ))
        ) : (
          <p>Loading related collection...</p>
        )}
      </TabPanel>
    </Tabs>
  );
};

export default MovieTabs;
