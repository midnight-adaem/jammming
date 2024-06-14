import styles from './Playlist.module.css';
import React from "react";
import Track from "./Track";

function Playlist({ tracks, name, setName, removeTrack }) {

  return (
    <div className={styles.Playlist}>
      <h3>Playlist <input value={name} onChange={(e) => setName(e.target.value)} /></h3>
      <button>Save to Spotify</button>
      <ul>
        {tracks.map((track) => (
          <Track track={track} key={track.id} trackAction={removeTrack}  result={false}/>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
