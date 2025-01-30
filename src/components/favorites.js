import React from 'react';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import { FaPlay, FaPause, FaHeart } from 'react-icons/fa';
import './favorites.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useUser();
  const { currentSong, isPlaying, playSong } = useAudio();

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      playSong({ ...song, isPlaying: !isPlaying });
    } else {
      playSong({ ...song, isPlaying: true });
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <FaHeart />
        <h2>No favorites yet</h2>
        <p>Start adding songs to your favorites by clicking the heart icon!</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>
      <div className="favorites-grid">
        {favorites.map((song) => (
          <div key={song.id} className="favorite-card">
            <div className="favorite-image">
              <img src={song.albumArt || song.thumbnail || song.logo} alt={song.title} />
              <div className="favorite-overlay">
                <button
                  className={`play-button ${currentSong?.id === song.id && isPlaying ? 'playing' : ''}`}
                  onClick={() => handlePlayPause(song)}
                >
                  {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            </div>
            <div className="favorite-info">
              <h3>{song.title}</h3>
              <p>{song.artist || song.host || 'Unknown Artist'}</p>
              <button 
                className="remove-favorite" 
                onClick={() => removeFromFavorites(song.id)}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
