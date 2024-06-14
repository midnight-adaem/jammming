import styles from './Tracklist.module.css';
import React from "react";
import Track from "./Track";

function TrackList({ tracks, addTrackToPlaylist }) {

  return (
    <div className={styles.TrackList}>
      <h3>Results</h3>
      <ul>
        {tracks.map((track) => (
          <Track track={track} key={track.id} trackAction={addTrackToPlaylist} result={true}/>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;
