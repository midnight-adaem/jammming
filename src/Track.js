import React from "react";
import styles from './Track.module.css';

function Track({track}) {

  return (
    <div className={styles.track}>
      <div className={styles.add}>+</div>
      <h4>{track.songName}</h4>
      <p>{track.artist} - {track.album}</p>
    </div>
  );
}

export default Track;
