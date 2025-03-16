import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./MovieTabs.module.scss";
import { Movie, MoviePreview } from "@interfaces/movies.ts";
import Slider from "@components/ui/Slider";
import ProductCard from "@components/ui/ProductCard";
import { options } from "@config/config.ts";
import { useCallback, useEffect, useState } from "react";

interface MovieTabsProps {
  data: Movie;
}
interface Budget {
  type: string;
  amount: number;
  currencyCode: string;
  name: string;
  symbol: string;
}

interface Budgets {
  total: number;
  items: Budget[];
}



const MovieTabs = ({ data }: MovieTabsProps) => {
  const [similar, setSimilar] = useState<MoviePreview[] | null>(null)
  const [budget, setBudget] = useState<Budgets | null>(null)
  const [tabIndex, setTabIndex] = useState(0);
  const [error, setError] = useState<number | null>(null);

  const fetchSimilar = useCallback(async (id: number) => {
    try {
      const url = new URL(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/sequels_and_prequels`)
      const response = await fetch(url, options)

      if (!response.ok) {
        setError(response.status)
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const similar = await response.json();

      setSimilar(similar)
      setError(null); 
    } catch (error) {
      console.log(error)
    }
  }, [])

  const fetchAbout = useCallback(async (id: number) => {
    try {
      const url = new URL(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/box_office`
      );
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      setBudget(data);
    } catch (error) {
      console.error("Ошибка загрузки бюджета:", error);
    } 
  }, []);

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
    setTabIndex(0)
    setError(null)
  }, [data.kinopoiskId])
  console.log(budget)
  return (
    <Tabs className={styles.tabs} selectedTabClassName={styles.tabs__active} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList className={styles.tabs__container}>
        <Tab className={styles.tabs__heading}>Description</Tab>
        <Tab className={styles.tabs__heading} onClick={() => fetchAbout(data.kinopoiskId)}>About</Tab>
        <Tab className={styles.tabs__heading} onClick={() => fetchSimilar(data.kinopoiskId)}>Similar</Tab>
      </TabList>

      <TabPanel selectedClassName={styles.tabs__panel}>
        <p>Total Votes: {data.ratingKinopoiskVoteCount}</p>
        <p>Rating: {data.ratingKinopoisk}</p>
        <p>Countries: {data.countries[0].country}</p>
        <p>Release Year: {data.year}</p>
        <div className={styles.tabs__panel_slider}>
          Genres: <Slider data={data.genres} />
        </div>
        <p className={styles.tabs__panel_description}>{data.description}</p>
      </TabPanel>
      <TabPanel selectedClassName={styles.tabs__panel}>
        <p>Countries: {data.countries[0].country}</p>
        <p>Release Year: {data.year}</p>
        <div className={styles.tabs__panel_slider}>
          Genres: <Slider data={data.genres} />
        </div>
        <p>Movie length: {data.filmLength} minutes</p>
        {budget?.total && (
           <>
               <p>
               Budget: { budget.items.map((item, index) => {
                 return item.type === 'BUDGET' && (
                  <>
                    {item.amount}{item.symbol}
                  </>
                 );
               })}
             </p>
             <p>
               Revenue: { budget.items.map((item, index) => {
                 return item.type === 'WORLD' && (
                  <>
                    {item.amount}{item.symbol}
                  </>
                 );
               })}
             </p>
            </>
        )}
      </TabPanel>
      <TabPanel
        selectedClassName={styles.tabs__panel}
        className={styles.tabs__panel_similar}
      >
        {error && (<p>{getErrorMessage(error)}</p>)}
        {similar && (similar ? (
          similar.map((item) => (
            <ProductCard data={item} key={item.kinopoiskId} />
          ))
        ) : '')}
      </TabPanel>
    </Tabs>
  );
};

export default MovieTabs;
