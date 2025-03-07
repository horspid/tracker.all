import styles from "./Search.module.scss";
import SearchICO from "@assets/images/icons/search.svg?react";

const Search = () => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.search__input}
        placeholder="Search everything..."
      />
      <span className={styles.search__icon}>
        <SearchICO />
      </span>
    </div>
  );
};

export default Search;
