import styles from './Search.module.css';

const Search = ({ query, setQuery }) => {
  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={styles.input}
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        aria-label="Search products"
      />
    </div>
  );
};

export default Search;
