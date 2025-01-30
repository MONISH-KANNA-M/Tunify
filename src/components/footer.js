import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RiRepeat2Fill, RiPlayListLine } from "react-icons/ri";
import { BiFullscreen } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAudio } from "../context/AudioContext";
import "./footer.css";
import logo from "./../assets/logo.jpg";

const Footer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    playlist,
    setCurrentSong,
    adjustVolume
  } = useAudio();
  
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [prevVolume, setPrevVolume] = useState(1);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isRepeating;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          togglePlay();
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong, isRepeating, togglePlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (!isRepeating) {
        playNext();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isRepeating, playNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setPrevVolume(newVolume);
    setIsMuted(newVolume === 0);
    adjustVolume(newVolume);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  return (
    <>
      <div className="footer">
        <div className="footer-left">
          <img src={currentSong?.albumArt || logo} alt="Album" className="album-cover" />
          <div className="song-info">
            <p className="song-title">{currentSong?.title || "Select a song"}</p>
            <p className="artist-name">{currentSong?.artist || "Unknown Artist"}</p>
          </div>
          <button className="heart-btn" onClick={toggleLike}>
            {isLiked ? <AiFillHeart color="#de6b2c" /> : <AiOutlineHeart />}
          </button>
        </div>

        <div className="footer-center">
          <div className="controls">
            <button onClick={playPrevious}><GiPreviousButton /></button>
            <button className="play-pause" onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={playNext}><GiNextButton /></button>
            <button 
              className={isRepeating ? "repeat-btn active" : "repeat-btn"} 
              onClick={() => setIsRepeating(!isRepeating)}
            >
              <RiRepeat2Fill />
            </button>
          </div>
          <div className="progress-bar">
            <span className="current-time">{formatTime(currentTime)}</span>
            <input
              type="range"
              className="progress-slider"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
            />
            <span className="total-time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="footer-right">
          <button onClick={togglePlaylist}><RiPlayListLine /></button>
          <div className="volume-control">
            <button onClick={toggleMute}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <button><BiFullscreen /></button>
        </div>

        {currentSong && <audio ref={audioRef} src={currentSong.src} />}
      </div>
      
      {showPlaylist && (
        <div className="playlist-overlay">
          <div className="playlist-container">
            <h3>Current Playlist</h3>
            <div className="playlist-songs">
              {playlist.map((song, index) => (
                <div 
                  key={song.id} 
                  className={`playlist-item ${currentSong?.id === song.id ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentSong(song);
                    togglePlay();
                  }}
                >
                  <img src={song.albumArt || logo} alt={song.title} />
                  <div>
                    <p>{song.title}</p>
                    <p className="artist">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
