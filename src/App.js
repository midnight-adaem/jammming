import React, { useState } from "react";
//import ReactDOM from "react-dom";
import './App.css';
import SearchBar from "./SearchBar";
import TrackList from "./TrackList";
import Playlist from "./Playlist";
import { generateRandomString, sha256, base64encode } from "./Utilities"


function App() {
  const [resultTracks, setResultTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const clientId = '939aa67c203c4870998c68c9cf6159d3';

  const authToSpotify = async () => {

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);

    const authUrl = new URL("https://accounts.spotify.com/authorize")
    const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
    const redirectUri = 'http://localhost:3000/';

    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();


  }

  const addTrackToPlaylist = (newTrack) => {
    // Make sure tracks aren't added twice
    const trackIndex = playlistTracks.findIndex((track) => track.id === newTrack.id);
    if (trackIndex < 0) {
      setPlaylistTracks((prevTracks) => [newTrack, ...prevTracks]);
    }

  }

  function removeTrackFromPlaylist(trackToRemove) {
    setPlaylistTracks((tracks) =>
      tracks.filter((track) => track.id !== trackToRemove.id)
    );
  }

  const doSearch = (searchTerm) => {

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

    setResultTracks(tracks);

  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JaMMMing</h1>
        <p>
          Search for tracks and build a playlist to save to Spotify
        </p>
      </header>
      <main>
        <SearchBar setTracks={setResultTracks} doSearch={doSearch} />
        <TrackList tracks={resultTracks} addTrackToPlaylist={addTrackToPlaylist} />
        <Playlist tracks={playlistTracks} name={playlistName} setName={setPlaylistName} removeTrack={removeTrackFromPlaylist} />
      </main>
    </div>
  );
}

export default App;
