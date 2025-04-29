import Search from "@components/ui/Search";
import ControlPanel from "@components/layout/ControlPanel";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { options } from "@config/config";
import { cardPreview } from "@interfaces/movies";
import { useNavigate } from "react-router";

interface MovieResponse {
  docs: cardPreview[];
}

const Header = () => {
  const [currentValue, setCurrentValue] = useState<string>("");
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentValue(value);
    debouncedSearch(value);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    return value.trim() ? fetchMoivies(value) : navigate(-1);
  }, 250);

  const fetchMoivies = async (value: string) => {
    try {
      const url = new URL(
        `https://api.kinopoisk.dev/v1.4/movie/search?&limit=20&query=${value}`
      );

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data: MovieResponse = await response.json();

      const result = data.docs;

      navigate("search", { state: { search: result } });
      return data.docs;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <header className="flex-5/6 flex justify-between px-30">
      <Search
        name={"Что хотите найти?"}
        onChange={onChangeHandler}
        value={currentValue}
      />
      <ControlPanel />
    </header>
  );
};

export default Header;
