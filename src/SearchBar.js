import React, { useState } from "react";
import styles from './SearchBar.module.css';

function SearchBar({ setTracks, doSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchTerm.length > 0) {
      // Get data
      doSearch(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <div className={styles.SearchBar}>
      <form onSubmit={handleSubmit}>
        <label htmlFor='searchTerm'>Search</label>
        <input type='text' id='searchTerm' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default SearchBar;
