import React, { useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import { FaPlay, FaPause, FaHeart } from 'react-icons/fa';
import './favorites.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useUser();
  const { currentSong, isPlaying, playSong, togglePlay } = useAudio();

  // Sort favorites by date added (newest first)
  const sortedFavorites = useMemo(() => {
    return [...favorites].sort((a, b) => {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });
  }, [favorites]);

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playSong({ ...song, isPlaying: true });
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <FaHeart />
        <h2>No favorites yet</h2>
        <p>Start adding songs to your favorites by clicking the heart icon while playing a song!</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>
      <p className="favorites-count">{favorites.length} {favorites.length === 1 ? 'song' : 'songs'}</p>
      <div className="favorites-grid">
        {sortedFavorites.map((song) => (
          <div key={song.id} className="favorite-card">
            <div className="favorite-image">
              <img 
                src={song.albumArt || song.thumbnail || song.logo} 
                alt={song.title} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-album-art.jpg';
                }}
              />
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
              <h3 title={song.title}>{song.title}</h3>
              <p title={song.artist || song.host || 'Unknown Artist'}>
                {song.artist || song.host || 'Unknown Artist'}
              </p>
              <button 
                className="remove-favorite" 
                onClick={() => removeFromFavorites(song.id)}
                title="Remove from favorites"
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
