import React, { useState } from "react";
import styles from './SearchBar.module.css';

function SearchBar({ setTracks }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchTerm.length > 0) {
      // Get data
      const tracks = [
        {
          id: 1,
          songName: 'foo',
          artist: 'Mr Bar',
          album: 'The Baz'
        },
        {
          id: 2,
          songName: 'oogy',
          artist: 'Mx Boogy',
          album: 'A Bunch of Goo'
        }
      ];

      setTracks(tracks);

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
