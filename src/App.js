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

  const addTrackToPlaylist = (newTrack) => {
    // Make sure tracks aren't added twice
    const trackIndex=playlistTracks.findIndex( (track) => track.id === newTrack.id  );
    if (trackIndex < 0) {
      setPlaylistTracks((prevTracks) => [newTrack, ...prevTracks]);
    }

  }


  function removeTrackFromPlaylist(trackToRemove) {
    setPlaylistTracks((tracks) =>
      tracks.filter((track) => track.id !== trackToRemove.id)
    );
  }

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
        <TrackList tracks={resultTracks} addTrackToPlaylist={addTrackToPlaylist} />
        <Playlist tracks={playlistTracks} name={playlistName} setName={setPlaylistName} removeTrack={removeTrackFromPlaylist} />
      </main>
    </div>
  );
}

export default App;
