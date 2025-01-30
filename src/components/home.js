import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../context/AudioContext";
import "./home.css";

// Import playlists data
import playlistsData from '../data/playlistsData';

const Home = () => {
  const navigate = useNavigate();
  const { currentSong, isPlaying, playSong, recentlyPlayed } = useAudio();
  const [discoveredSongs, setDiscoveredSongs] = useState([]);

  // Function to get random songs from playlists
  const getRandomSongs = () => {
    const allSongs = playlistsData.reduce((acc, playlist) => {
      const playlistSongs = playlist.songs.map(song => ({
        ...song,
        playlistName: playlist.title,
        imageUrl: song.albumArt || playlist.imageUrl,
        id: `${playlist.id}_${song.title}`,
        url: song.url || `path/to/audio/${song.title}.mp3` // Add proper URL here
      }));
      return [...acc, ...playlistSongs];
    }, []);

    const shuffledSongs = allSongs
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    if (shuffledSongs.length < 10) {
      const additional = Array(10 - shuffledSongs.length)
        .fill()
        .map(() => shuffledSongs[Math.floor(Math.random() * shuffledSongs.length)]);
      return [...shuffledSongs, ...additional];
    }
    
    return shuffledSongs;
  };

  useEffect(() => {
    setDiscoveredSongs(getRandomSongs());
  }, []);

  const handlePlayPause = (song) => {
    playSong(song);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Tune</h1>
      
      {/* Recently Played Section */}
      <section className="recently-played-section">
        <h2>Recently Played</h2>
        {recentlyPlayed.length === 0 ? (
          <p className="no-songs">No songs played yet. Start playing to see your history!</p>
        ) : (
          <div className="song-grid">
            {recentlyPlayed.map((song) => (
              <div key={`${song.id}-${Date.now()}`} className="song-card">
                <div className="song-image">
                  <img src={song.albumArt || song.imageUrl} alt={song.title} />
                </div>
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p className="artist">{song.artist}</p>
                  {song.duration && (
                    <p className="duration">
                      <FaClock /> {song.duration}
                    </p>
                  )}
                </div>
                <button
                  className={`play-button ${currentSong?.id === song.id && isPlaying ? 'playing' : ''}`}
                  onClick={() => handlePlayPause(song)}
                >
                  {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Discovered by You Section */}
      <section className="discovered-section">
        <h2>Discovered by You</h2>
        <div className="song-grid">
          {discoveredSongs.map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-image">
                <img src={song.imageUrl} alt={song.title} />
              </div>
              <div className="song-info">
                <h3>{song.title}</h3>
                <p className="artist">{song.artist}</p>
                <p className="playlist-name">From {song.playlistName}</p>
                {song.duration && (
                  <p className="duration">
                    <FaClock /> {song.duration}
                  </p>
                )}
              </div>
              <button
                className={`play-button ${currentSong?.id === song.id && isPlaying ? 'playing' : ''}`}
                onClick={() => handlePlayPause(song)}
              >
                {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
