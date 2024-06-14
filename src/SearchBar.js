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
          id: '3hOl3m95FMHHJY9cbca5Yi',
          songName: 'Get A Day Job',
          artist: 'Rouge',
          album: 'Get A Day Job',
          uri: 'https://open.spotify.com/track/3hOl3m95FMHHJY9cbca5Yi?si=5f6f467442f64050'
        },
        {
          id: '0Dwx7x7JpG75LsskhhvAT5',
          songName: 'Cedarwood',
          artist: 'Drymer',
          album: 'Cedarwood/Vetiver',
          uri: 'https://open.spotify.com/track/0Dwx7x7JpG75LsskhhvAT5?si=d3c54ce482b34ad9'
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
