import React, { useState, useEffect } from "react";
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
  const [userData, setUserData] = useState({});

  //const [refreshToken, setRefreshToken] = useState("");
  //const [tokenExpires, setTokenExpires] = useState("");

  const clientId = '939aa67c203c4870998c68c9cf6159d3';
  const authorizationEndpoint = "https://accounts.spotify.com/authorize";
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const redirectUri = 'http://localhost:3000/';
  const apiUrl = "https://api.spotify.com/v1/";

  const authToSpotify = async () => {

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const authUrl = new URL(authorizationEndpoint);
    const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';


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


  const doSearch = async (searchTerm) => {

    // Get data
    const searchUrl = "search?type=track";

    const fetchUrl = apiUrl + searchUrl + "&q=" + encodeURIComponent(searchTerm);

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + accessToken },
    });

    // convert response data into objects
    const json = await response.json();

    const tracks = json.tracks.items;

    setResultTracks(tracks);

  };


  const getUserData = async () => {
    // We need the user ID if we don't already have it
    if (accessToken && Object.keys(userData).length < 1) {
      let searchUrl = "me";
      let fetchUrl = apiUrl + searchUrl;
      const userResponse = await fetch(fetchUrl, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken },
      });

      const userData = await userResponse.json();
      setUserData(userData);
      return userData.id;
    } else {
      return userData.id;
    }

  }


  const createSpotifyPlaylist = async (userId) => {
    if (accessToken && userId) {
      let createUrl = "users/" + userId + "/playlists";
      let fetchUrl = apiUrl + createUrl;
      const body = { name: playlistName, public: false, collaborative: false, description: 'jaMMMing playlist test' };

      const playlistResponse = await fetch(fetchUrl, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + accessToken },
        body: JSON.stringify(body),
      });

      const playlistData = await playlistResponse.json();
      return playlistData.id;

    } else { return null; }
  }

  const addTracksToSpotifyPlaylist = async (playlistId, trackUris) => {
    if (accessToken && playlistId && trackUris.length > 0) {
      let addUrl = "playlists/" + playlistId + "/tracks";
      let fetchUrl = apiUrl + addUrl;
      const body = { position: 0, uris: trackUris };


      const playlistAddResponse = await fetch(fetchUrl, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + accessToken },
        body: JSON.stringify(body),
      });

      const addData = await playlistAddResponse.json();
      return addData.snapshot_id;

    } else { return null; }
  }


  const savePlaylist = async () => {

    // Make sure playlist name isn't empty
    if (playlistName.length === 0) {
      alert("Playlist name must not be empty");
    } else {

      // Get list of track IDs
      const trackUris = [];
      playlistTracks.map((track) => (
        trackUris.push(track.uri)
      ));

      if (trackUris.length > 0) {

        const userId = await getUserData();

        // Create Playlist 
        const playlistId = await createSpotifyPlaylist(userId);

        // Add tracks to playlist
        await addTracksToSpotifyPlaylist(playlistId, trackUris);

        //wipe playlist
        setPlaylistTracks([]);
        setPlaylistName("");


      } else { alert("Playlist must not be empty"); }

    }


  };


  async function getToken(code) {
    const code_verifier = localStorage.getItem('code_verifier');

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: code_verifier,
      }),
    });

    return await response.json();
  }



  // Effect to check for Spotify token when we load, and if we find it, extract it and store it
  useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    const code = args.get('code');
    let inProgress = false;

    if (code && !accessToken && !inProgress) {
      inProgress = true;
      async function fetchToken() {

        const token = await getToken(code);

        setAccessToken(token.access_token);
        //setRefreshToken(token.refresh_token);
        //setTokenExpires(token.access_token);

        inProgress = false;

        //await getUserData();

      }
      fetchToken();

      // Remove code from URL so we can refresh correctly.
      const url = new URL(window.location.href);
      url.searchParams.delete("code");

      const updatedUrl = url.search ? url.href : url.href.replace('?', '');
      window.history.replaceState({}, document.title, updatedUrl);
    }


  }, [accessToken]);




  return (
    <div className="App">
      <header className="App-header">
        <h1>JaMMMing</h1>
        <p>
          Search for tracks and build a playlist to save to Spotify {(userData.display_name) ? "for " + userData.display_name : ""}
        </p>
      </header>
      <main>
        {(accessToken) ? "" : <div className="login"><button id="loginButton" onClick={authToSpotify} >Log in with Spotify</button></div>}
        {(accessToken) ? <SearchBar setTracks={setResultTracks} doSearch={doSearch} /> : ""}
        {(accessToken) ? <TrackList tracks={resultTracks} addTrackToPlaylist={addTrackToPlaylist} /> : ""}
        {(accessToken) ? <Playlist tracks={playlistTracks} name={playlistName} setName={setPlaylistName} removeTrack={removeTrackFromPlaylist} savePlaylist={savePlaylist} /> : ""}
      </main>
    </div>
  );
}

export default App;
