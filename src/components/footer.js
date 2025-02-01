import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RiRepeat2Fill, RiPlayListLine } from "react-icons/ri";
import { BiFullscreen } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAudio } from "../context/AudioContext";
import { useUser } from "../context/UserContext";
import "./footer.css";
import logo from "./../assets/logo.jpg";

const Footer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    allSongs,
    playSong,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    adjustVolume
  } = useAudio();
  
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useUser();
  
  const [isRepeating, setIsRepeating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(1);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Check if current song is in favorites
  const isCurrentSongLiked = currentSong ? isFavorite(currentSong.songId) : false;

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    seek(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    adjustVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      adjustVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      adjustVolume(0);
    }
    setIsMuted(!isMuted);
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const toggleFavorite = () => {
    if (!currentSong) return;
    
    if (isCurrentSongLiked) {
      removeFromFavorites(currentSong.songId);
    } else {
      addToFavorites({
        songId: currentSong.songId,
        title: currentSong.title,
        artist: currentSong.artist,
        albumArt: currentSong.albumArt,
        audioUrl: currentSong.audioUrl
      });
    }
  };

  useEffect(() => {
    if (isRepeating && currentTime >= duration && duration > 0) {
      seek(0);
      togglePlay();
    }
  }, [currentTime, duration, isRepeating]);

  if (!currentSong) {
    return null;
  }

  return (
    <div className="footer">
      <div className="footer-left">
        <img src={currentSong.albumArt || logo} alt="Album Art" className="album-art" />
        <div className="song-info">
          <span className="song-title">{currentSong.title}</span>
          <span className="song-artist">{currentSong.artist}</span>
        </div>
        <button 
          className={`favorite-btn ${isCurrentSongLiked ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          {isCurrentSongLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>

      <div className="footer-center">
        <div className="controls">
          <button className="control-btn" onClick={playPrevious}>
            <GiPreviousButton />
          </button>
          <button className="control-btn play-btn" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="control-btn" onClick={playNext}>
            <GiNextButton />
          </button>
          <button 
            className={`control-btn ${isRepeating ? 'active' : ''}`} 
            onClick={toggleRepeat}
          >
            <RiRepeat2Fill />
          </button>
        </div>
        <div className="progress-container">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="progress-bar"
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="footer-right">
        <button 
          className="playlist-btn control-btn" 
          onClick={() => setShowPlaylist(!showPlaylist)}
        >
          <RiPlayListLine />
        </button>
        <button className="volume-btn control-btn" onClick={toggleMute}>
          {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <button className="fullscreen-btn control-btn">
          <BiFullscreen />
        </button>
      </div>

      {showPlaylist && (
        <div className="playlist-modal">
          <div className="playlist-header">
            <h3>Current Playlist</h3>
            <button onClick={() => setShowPlaylist(false)}>×</button>
          </div>
          <div className="playlist-songs">
            {allSongs.map((song, index) => (
              <div
                key={song.songId}
                className={`playlist-item ${currentSong.songId === song.songId ? 'active' : ''}`}
                onClick={() => playSong(song)}
              >
                <img src={song.albumArt || logo} alt="Album Art" />
                <div className="song-details">
                  <span className="song-title">{song.title}</span>
                  <span className="song-artist">{song.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
