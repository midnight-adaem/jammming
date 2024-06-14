import React, { useState } from "react";
//import ReactDOM from "react-dom";
import './App.css';
import SearchBar from "./SearchBar";
import TrackList from "./TrackList";
import Playlist from "./Playlist";


function App() {
  const [resultTracks, setResultTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h1>JaMMMing</h1>
        <p>
          Search for tracks and build a playlist to save to Spotify
        </p>
      </header>
      <main>
        <SearchBar setTracks={setResultTracks} />
        <TrackList tracks={resultTracks} />
        <Playlist tracks={playlistTracks} name={playlistName} setName={setPlaylistName} />
      </main>
    </div>
  );
}

export default App;
