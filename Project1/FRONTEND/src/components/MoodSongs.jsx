import React, { useState } from 'react';
import './MoodSongs.css';

const MoodSongs = ({ Songs }) => {
  const [playingId, setPlayingId] = useState(null);

  const togglePlay = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="songs-container">
      <h2 className="section-title">Your Mood Mix</h2>
      <div className="song-list">
        {Songs && Songs.length > 0 ? (
          Songs.map((song, index) => (
            <div className={`song-card ${playingId === index ? 'active' : ''}`} key={index}>
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
              
              <button className="icon-button" onClick={() => togglePlay(index)}>
                <i className={playingId === index ? "ri-pause-circle-fill" : "ri-play-circle-line"}></i>
              </button>

              {playingId === index && (
                <audio src={song.audio} autoPlay onEnded={() => setPlayingId(null)} />
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <i className="ri-music-2-line"></i>
            <p>Scan your face to generate a playlist</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSongs;