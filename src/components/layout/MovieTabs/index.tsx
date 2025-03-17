import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./MovieTabs.module.scss";
import { Movie } from "@interfaces/movies.ts";
import Slider from "@components/ui/Slider";
import ProductCard from "@components/ui/ProductCard";
import { useEffect, useState } from "react";

interface MovieTabsProps {
  data: Movie;
}

const MovieTabs = ({ data }: MovieTabsProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [error, setError] = useState<number | null>(null);

  const getErrorMessage = (status: number) => {
    switch (status) {
      case 400:
        return "Query was not corrected";
      case 401:
        return "Unauthorized user";
      case 403:
        return "Access denied";
      case 404:
        return "Movies not found.";
      case 500:
        return "Server Error. Try later";
      default:
        return null;
    }
  }

  useEffect(() => {
    setTabIndex(0);
    setError(null);
  }, [data.id])
  console.log(data.sequelsAndPrequels)
  return (
    <Tabs className={styles.tabs} selectedTabClassName={styles.tabs__active} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList className={styles.tabs__container}>
        <Tab className={styles.tabs__heading}>Description</Tab>
        <Tab className={styles.tabs__heading}>About</Tab>
        <Tab className={styles.tabs__heading}>Related</Tab>
        <Tab className={styles.tabs__heading} >Similar</Tab>
      </TabList>

      <TabPanel selectedClassName={styles.tabs__panel}>
        <p>Total Votes: {data.votes.kp}</p>
        <p>Rating: {data.rating.imdb || data.rating.kp}</p>
        <p>Countries: {data.countries.length && data.countries[0].name}</p>
        <p>Release Year: {data.year}</p>
        <div className={styles.tabs__panel_slider}>
          Genres: <Slider data={data.genres} />
        </div>
        <p className={styles.tabs__panel_description}>{data.description}</p>
      </TabPanel>
      <TabPanel selectedClassName={styles.tabs__panel}>
        <p>Countries: {data.countries.length && data.countries[0].name}</p>
        <p>Release Year: {data.year}</p>
        <div className={styles.tabs__panel_slider}>
          Genres: <Slider data={data.genres} />
        </div>
        <p>Movie length: {data.movieLength} minutes</p>
        {data.budget && (<p>Budget: {data.budget.value} {data.budget.currency}</p>)}
      </TabPanel>
      <TabPanel
        selectedClassName={styles.tabs__panel}
        className={styles.tabs__panel_similar}
      >
        {error && (<p>{getErrorMessage(error)}</p>)}
        {data.sequelsAndPrequels && data.sequelsAndPrequels.map(item => (
          <ProductCard data={item} key={item.id} />
        ))}
      </TabPanel>
      <TabPanel
        selectedClassName={styles.tabs__panel}
        className={styles.tabs__panel_similar}
      >
        {error && (<p>{getErrorMessage(error)}</p>)}
        {data.similarMovies && data.similarMovies.map((item) => (
          <ProductCard data={item} key={item.id} />
        ))}
      </TabPanel>
    </Tabs>
  );
};

export default MovieTabs;
