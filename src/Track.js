import React from "react";
import styles from './Track.module.css';

function Track({track, trackAction, result}) {

  const trackHandler = (e) => {
    trackAction(track);
  }


  return (
    <div className={styles.track}>
      <button className={styles.add} onClick={trackHandler}>{result ? '+' : '-'}</button>
      <h4>{track.name}</h4>
      <p>{track.artists[0].name} - {track.album.name}</p>
    </div>
  );
}

export default Track;
