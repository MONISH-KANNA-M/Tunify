import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../context/AudioContext";
import { songs } from "./playlist";
import logo from './../assets/logo.jpg';
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const { currentSong, isPlaying, playSong } = useAudio();
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [discoveredSongs, setDiscoveredSongs] = useState([]);

  useEffect(() => {
    // Get all songs from playlist
    const allSongs = Object.entries(songs).reduce((acc, [artist, artistSongs]) => {
      return [...acc, ...artistSongs.map(song => ({
        ...song,
        artist,
        imageUrl: logo,
        url: song.src
      }))];
    }, []);

    // Get random songs for discovery
    const randomSongs = [...allSongs]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    setDiscoveredSongs(randomSongs);

    // Get recently played from localStorage or use first few songs
    const savedRecent = localStorage.getItem('recentlyPlayed');
    if (savedRecent) {
      setRecentlyPlayed(JSON.parse(savedRecent));
    } else {
      setRecentlyPlayed(allSongs.slice(0, 5));
    }
  }, []);

  const handlePlayPause = (song) => {
    // Add to recently played if not already in the list
    setRecentlyPlayed(prev => {
      const isExisting = prev.some(s => s.id === song.id);
      if (!isExisting) {
        const newList = [song, ...prev].slice(0, 4); // Keep only last 4 songs
        return newList;
      }
      return prev;
    });
    
    playSong(song);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Tunify</h1>

      {/* Recently Played Section */}
      <section className="recently-played-section">
        <h2>Recently Played</h2>
        {recentlyPlayed.length === 0 ? (
          <p className="no-songs">No songs played yet. Start playing to see your history!</p>
        ) : (
          <div className="grid-container">
            {recentlyPlayed.map((song) => (
              <div key={song.id} className="card">
                <div className="card-image">
                  <img src={song.imageUrl} alt={song.title} />
                  <button
                    className={`play-button ${currentSong?.id === song.id && isPlaying ? 'playing' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause(song);
                    }}
                  >
                    {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
                <h5>{song.title}</h5>
                <p className="artist">{song.artist}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Discovered Section */}
      <section className="discovered-section">
        <h2>Discover For You</h2>
        <div className="grid-container">
          {discoveredSongs.map((song) => (
            <div key={song.id} className="card">
              <div className="card-image">
                <img src={song.imageUrl} alt={song.title} />
                <button
                  className={`play-button ${currentSong?.id === song.id && isPlaying ? 'playing' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause(song);
                  }}
                >
                  {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
              <h5>{song.title}</h5>
              <p className="artist">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Favourite Artists Section */}
      <section className="favourites-section">
        <h2>Your Favourites</h2>
        <div className="grid-container">
          {[
            "Anirudh",
            "A. R. Rahman",
            "Yuvan Shankar",
            "Harris Jayaraj",
            "Hip Hop Tamizha",
            "G. V. Prakash",
            "Thaman S"
          ].map((artist, index) => (
            <div className="card" key={index} onClick={() => navigate(`/playlist/${artist}`)}>
              <img src={logo} alt={artist} />
              <h5>{artist}</h5>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
