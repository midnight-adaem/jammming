import styles from './Playlist.module.css';
import React from "react";
import Track from "./Track";

function Playlist({ tracks, name }) {

  return (
    <div className={styles.Playlist}>
      <h3>Playlist: {name}</h3>
      <ul>
        {tracks.map((track) => (
          <Track track={track} key={track.id} />
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
