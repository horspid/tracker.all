import styles from "./Search.module.scss";
import SearchICO from "@assets/images/icons/search.svg?react";

interface SearchProps {
  name?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string,
}

const Search = ({name, onChange, value} : SearchProps) => {
  return (
    <div className={styles.search}>
      <input
        value={value}
        type="text"
        className={styles.search__input}
        placeholder={name || 'Search everything...'}
        onChange={onChange}
      />
      <span className={styles.search__icon}>
        <SearchICO />
      </span>
    </div>
  );
};

export default Search;
